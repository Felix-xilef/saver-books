/* eslint-disable prefer-const */
import { Request, Response } from "express";
import { FindOptionsWhere, getRepository, LessThan } from "typeorm";

import { Book } from "../entities/books/Book";
import { Loan } from "../entities/operations/Loan";
import { LoanStatus } from "../entities/operations/LoanStatus";
import { LoanJson } from "../interfaces/LoanJson";
import { Reservation } from "../entities/operations/Reservation";
import { ReservationStatus } from "../entities/operations/ReservationStatus";
import { Client } from "../entities/clients/Client";
import { bookToJson } from "../interfaces/BookJson";
import { clientToJson } from "../interfaces/ClientJson";

const getLoanFromJson = async (loanJson: LoanJson): Promise<Loan> => {
  const client = new Client(
    loanJson.client.cpf,
    loanJson.client.name,
    loanJson.client.phone,
    loanJson.client.email,
    loanJson.client.blockStart,
    loanJson.client.blockEnd,
  );

  const loan = new Loan(
    client,
    await getRepository(Book).findOne(loanJson.bookIsbn, {
      relations: { genre: true },
    }),
    loanJson.withdrawalDate,
    loanJson.returnDate,
    new LoanStatus(loanJson.loanStatus.id),
  );

  if (loanJson.id) loan.id = loanJson.id;

  return loan;
};

const getJsonFromLoan = (loan: Loan): LoanJson => {
  return {
    id: loan.id,
    clientCpf: loan.client.cpf,
    bookIsbn: loan.book.isbn,
    withdrawalDate: loan.withdrawalDate,
    returnDate: loan.returnDate,
    book: bookToJson(loan.book),
    client: clientToJson(loan.client),
    loanStatus: {
      id: loan.loanStatus.id,
      description: loan.loanStatus.description,
    },
  };
};

export class LoanController {
  async select(request: Request, response: Response): Promise<Response> {
    const id = String(request.query.id);

    if (id) {
      try {
        const loan: Loan = await getRepository(Loan).findOne(id, {
          relations: { book: true, loanStatus: true },
        });

        if (loan) response.status(200).json(getJsonFromLoan(loan));
        else response.status(404).json({ error: "Loan not found" });
      } catch (error) {
        response.status(500).json({ error: error.message });
      }
    } else
      response.status(400).json({ error: "id can't be null or undefined" });

    return response;
  }

  async selectAll(request: Request, response: Response): Promise<Response> {
    const isbn = request.query.isbn;
    const cpf = request.query.cpf;

    let whereStatement: FindOptionsWhere<Loan> = {};

    if (isbn && isbn != "") whereStatement.bookIsbn = String(isbn);

    if (cpf && cpf != "") whereStatement.clientCpf = String(cpf);

    try {
      const loans: Loan[] = await getRepository(Loan).find({
        relations: { client: true, book: { genre: true }, loanStatus: true },
        where: whereStatement,
      });

      const loansJson: LoanJson[] = [];

      loans.forEach((element) => {
        loansJson.push(getJsonFromLoan(element));
      });

      response.status(200).json(loansJson);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }

    return response;
  }

  async saveEntry(request: Request, response: Response): Promise<Response> {
    const loanRepository = getRepository(Loan);
    const reservationRepository = getRepository(Reservation);

    try {
      const receivedData: LoanJson = request.body;

      const loan = await loanRepository.create(
        await getLoanFromJson(receivedData),
      );

      if (receivedData.reservationId) {
        const reservation = await reservationRepository.findOne(
          receivedData.reservationId,
          {
            relations: {
              reservationStatus: true,
              book: { genre: true },
              client: true,
            },
          },
        );

        reservation.reservationStatus = new ReservationStatus(3);

        reservationRepository.save(reservation);
      } else if (loan.id) {
        const oldLoan = await loanRepository.findOne(loan.id, {
          relations: { loanStatus: true, book: { genre: true }, client: true },
        });

        if (loan.loanStatus.id == 3 && oldLoan.loanStatus.id != 3) {
          loan.book.returnCopy();
          getRepository(Book).save(loan.book);
        } else if (loan.loanStatus.id != 3 && oldLoan.loanStatus.id == 3) {
          loan.book.getCopy();
          getRepository(Book).save(loan.book);
        }

        if (oldLoan.loanStatus.id != 2 && loan.loanStatus.id == 2) {
          loan.client.blockStart = new Date();
          getRepository(Client).save(loan.client);
        }
      } else {
        loan.book.getCopy();
        getRepository(Book).save(loan.book);
      }

      loanRepository.save(loan);

      response.status(201).json(getJsonFromLoan(loan));
    } catch (error) {
      response.status(500).json({ error: error.message });
    }

    return response;
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = String(request.query.id);

    if (id) {
      try {
        const loan: Loan = await getRepository(Loan).findOne(id, {
          relations: { book: true, loanStatus: true },
        });

        if (loan) {
          getRepository(Loan).remove(loan);

          response.status(200).json(getJsonFromLoan(loan));
        } else response.status(404).json({ error: "Loan not found" });
      } catch (error) {
        response.status(500).json({ error: error.message });
      }
    } else
      response.status(400).json({ error: "id can't be null or undefined" });

    return response;
  }

  async scheduleUpdate() {
    console.log("In??cio Empr??stimo. Data/Hora: ", new Date());

    const loanRepository = getRepository(Loan);
    const delayedLoans = await loanRepository.find({
      relations: { client: true },
      where: {
        returnDate: LessThan(new Date().toISOString().split("T")[0]),
        loanStatusId: 1,
      },
    });

    delayedLoans.forEach((loan) => {
      loan.client.blockStart = new Date();
      getRepository(Client).save(loan.client);

      loan.loanStatus = new LoanStatus(2);
      loanRepository.save(loan);
    });

    console.log("Todos os empr??stimos percorridos. Data/Hora: ", new Date());
  }
}
