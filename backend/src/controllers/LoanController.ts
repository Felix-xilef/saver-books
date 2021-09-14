import { Book } from "../entities/books/Book";
import { Loan } from "../entities/operations/Loan";
import { LoanStatus } from "../entities/operations/LoanStatus";
import { LoanJson } from "../interfaces/LoanJson";
import { Reservation } from "../entities/operations/Reservation";
import { ReservationStatus } from "../entities/operations/ReservationStatus";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

const getLoanFromJson = async (loanJson: LoanJson): Promise<Loan> => {
    const loan = new Loan(
        loanJson.cpf,
        loanJson.name,
        loanJson.phone,
        loanJson.email,
        await getRepository(Book).findOne(loanJson.bookIsbn, { relations: { genre: true } }),
        loanJson.withdrawalDate,
        loanJson.returnDate,
        new LoanStatus(
            loanJson.loanStatus.id
        )
    );

    if (loanJson.id) loan.id = loanJson.id;

    return loan;
};

const getJsonFromLoan = (loan: Loan): LoanJson => {
    return {
        id: loan.id,
        cpf: loan.cpf,
        name: loan.name,
        phone: loan.phone,
        email: loan.email,
        bookIsbn: loan.book.isbn,
        withdrawalDate: loan.withdrawalDate,
        returnDate: loan.returnDate,
        loanStatus: {
            id: loan.loanStatus.id,
            description: loan.loanStatus.description
        }
    }
}

export class LoanController {
    async select(request: Request, response: Response): Promise<Response> {
        const id = String(request.query.id);

        if (id) {
            try {
                const loan: Loan = await getRepository(Loan).findOne(id, { relations: { book: true, loanStatus: true, } });
    
                if (loan) response.status(200).json(getJsonFromLoan(loan));
                else response.status(404).json({ "error": "Loan not found" });
            } catch (error) {
                response.status(500).json({ "error": error.message });
            }
        } else response.status(400).json({ "error": "id can't be null or undefined" });

        return response;
    }
    
    async selectAll(request: Request, response: Response): Promise<Response> {
        const isbn = request.query.isbn;
        const cpf = request.query.cpf;

        let whereStatement = {};

        if (isbn && isbn != '') {
            let book = await getRepository(Book).findOne(String(isbn));

            if (!book) {
                return response.status(404).json({ "error": "Book not found" });
            } else {
                whereStatement = { book: book }
            }
        } else if (cpf && cpf != '') {
            whereStatement = { cpf: String(cpf) }
        }

        try {
            const loans: Loan[] = await getRepository(Loan).find({
                relations: { book: true, loanStatus: true, },
                where: whereStatement,
            });
    
            let loansJson: LoanJson[] = [];
    
            loans.forEach((element) => {
                loansJson.push(getJsonFromLoan(element));
            });
    
            response.status(200).json(loansJson)

        } catch (error) {
            response.status(500).json({ "error": error.message });
        }

        return response;
    }
    
    async saveEntry(request: Request, response: Response): Promise<Response> {
        const loanRepository = getRepository(Loan);
        const reservationRepository = getRepository(Reservation);

        try {
            const receivedData: LoanJson = request.body;

            const loan = await loanRepository.create(await getLoanFromJson(receivedData));

            if (receivedData.reservationId) {
                const reservation = await reservationRepository.findOne(receivedData.reservationId, { relations: { reservationStatus: true } });

                reservation.reservationStatus = new ReservationStatus(3);

                reservationRepository.save(reservation);
            } else if (loan.id) {
                const oldLoan = await loanRepository.findOne(loan.id, { relations: { book: true, loanStatus: true } });

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
            response.status(500).json({ "error": error.message })
        }

        return response;
    }
    
    async delete(request: Request, response: Response): Promise<Response> {
        const id = String(request.query.id);

        if (id) {
            try {
                const loan: Loan = await getRepository(Loan).findOne(id, { relations: { book: true, loanStatus: true, } });
    
                if (loan) {
                    getRepository(Loan).remove(loan);

                    response.status(200).json(getJsonFromLoan(loan));

                } else response.status(404).json({ "error": "Loan not found" });
            } catch (error) {
                response.status(500).json({ "error": error.message });
            }
        } else response.status(400).json({ "error": "id can't be null or undefined" });

        return response;
    }
}