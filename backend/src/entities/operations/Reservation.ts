import { Book } from "../books/Book";
import {Column, Entity, ManyToOne} from "typeorm";
import { Operation } from "./Operation";
import { ReservationStatus } from "./ReservationStatus";
import { Client } from "../clients/Client";

@Entity()
export class Reservation extends Operation {

    @Column('datetime')
    reservedDate: Date;

    @Column('datetime')
    withdrawalDate: Date;

    @ManyToOne(() => ReservationStatus)
    reservationStatus: ReservationStatus;

    constructor(
        client: Client,
        book: Book,
        reservedDate: Date,
        withdrawalDate: Date,
        resStatus: ReservationStatus
    ) {
        super(client, book);
        this.reservedDate = reservedDate;
        this.withdrawalDate = withdrawalDate;
        this.reservationStatus = resStatus;
    }
}
