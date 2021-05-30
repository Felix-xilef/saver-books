import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class ReservationStatus {

    @PrimaryColumn()
    id: number;

    @Column()
    description: string;

    constructor(id: number) {
        let description = [
            'Aberto',
            'Atrasado',
            'Retirado',
            'Cancelado'
        ];
        this.id = id;
        this.description = description[id-1];
    }
}
