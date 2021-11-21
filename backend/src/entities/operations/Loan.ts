import { Column, Entity, ManyToOne } from "typeorm";

import { Book } from "../books/Book";
import { Client } from "../clients/Client";
import { LoanStatus } from "./LoanStatus";
import { Operation } from "./Operation";

@Entity()
export class Loan extends Operation {
  @Column("timestamp")
  withdrawalDate: Date;

  @Column("timestamp")
  returnDate: Date;

  @Column()
  loanStatusId: number;
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
