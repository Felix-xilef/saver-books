import { Book } from "../entities/books/Book";
import { Loan } from "../entities/operations/Loan";
import { LoanStatus } from "../entities/operations/LoanStatus";
import { LoanJson } from "../interfaces/LoanJson";
import { Reservation } from "../entities/operations/Reservation";
import { ReservationStatus } from "../entities/operations/ReservationStatus";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Client } from "../entities/clients/Client";

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

    let whereStatement = {};

    if (isbn && isbn != "") {
      const book = await getRepository(Book).findOne(String(isbn));

      if (!book) {
        return response.status(404).json({ error: "Book not found" });
      } else {
        whereStatement = { book };
      }
    } else if (cpf && cpf != "") {
      whereStatement = { cpf: String(cpf) };
    }

    try {
      const loans: Loan[] = await getRepository(Loan).find({
        relations: { book: true, loanStatus: true },
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
          { relations: { reservationStatus: true } },
        );

        reservation.reservationStatus = new ReservationStatus(3);

        reservationRepository.save(reservation);
      } else if (loan.id) {
        const oldLoan = await loanRepository.findOne(loan.id, {
          relations: { book: true, loanStatus: true },
        });

        if (loan.loanStatus.id == 3 && oldLoan.loanStatus.id != 3) {
          loan.book.returnCopy();
          getRepository(Book).save(loan.book);
        } else if (loan.loanStatus.id != 3 && oldLoan.loanStatus.id == 3) {
          loan.book.getCopy();
          getRepository(Book).save(loan.book);
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
}
