import { Book } from "../books/Book";
import {Column, Entity, ManyToOne} from "typeorm";
import { Operation } from "./Operation";
import { ReservationStatus } from "./ReservationStatus";

@Entity()
export class Reservation extends Operation {

    @Column('datetime')
    reservedDate: Date;

    @Column('datetime')
    withdrawalDate: Date;

    @ManyToOne(() => ReservationStatus)
    reservationStatus: ReservationStatus;

    constructor(
        cpf: string,
        name: string,
        phone: string,
        email: string,
        book: Book,
        reservedDate: Date,
        withdrawalDate: Date,
        resStatus: ReservationStatus
    ) {
        super(
            cpf,
            name,
            phone,
            email,
            book
        );
        this.reservedDate = reservedDate;
        this.withdrawalDate = withdrawalDate;
        this.reservationStatus = resStatus;
    }
}
