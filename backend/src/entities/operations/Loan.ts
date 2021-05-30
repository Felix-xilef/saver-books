import { Book } from "../books/Book";
import {Column, Entity, ManyToOne} from "typeorm";
import { LoanStatus } from "./LoanStatus";
import { Operation } from "./Operation";

@Entity()
export class Loan extends Operation {

    @Column('datetime')
    withdrawalDate: Date;

    @Column('datetime')
    returnDate: Date;

    @ManyToOne(() => LoanStatus)
    loanStatus: LoanStatus;

    constructor(
        cpf: string,
        name: string,
        phone: string,
        email: string,
        book: Book,
        withdrawalDate: Date,
        returnDate: Date,
        loanStatus: LoanStatus
    ) {
        super(
            cpf,
            name,
            phone,
            email,
            book
        );
        this.withdrawalDate = withdrawalDate;
        this.returnDate = returnDate;
        this.loanStatus = loanStatus;
    }
}
