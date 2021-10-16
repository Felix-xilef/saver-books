import { Column, Entity, ManyToOne } from "typeorm";

import { Book } from "../books/Book";
import { Client } from "../clients/Client";
import { LoanStatus } from "./LoanStatus";
import { Operation } from "./Operation";

@Entity()
export class Loan extends Operation {
  @Column("datetime")
  withdrawalDate: Date;

  @Column("datetime")
  returnDate: Date;

  @ManyToOne(() => LoanStatus)
  loanStatus: LoanStatus;

  constructor(
    client: Client,
    book: Book,
    withdrawalDate: Date,
    returnDate: Date,
    loanStatus: LoanStatus,
  ) {
    super(client, book);
    this.withdrawalDate = withdrawalDate;
    this.returnDate = returnDate;
    this.loanStatus = loanStatus;
  }
}
