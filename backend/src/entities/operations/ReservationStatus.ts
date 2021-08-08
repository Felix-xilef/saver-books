import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class ReservationStatus {

    @PrimaryColumn()
    id: number;

    @Column()
    description: string;

    /**
     * Creates a new ReservationStatus object
     * @param id Object id, insert:
     *  - 1 -> 'Aberto'
     *  - 2 -> 'Atrasado'
     *  - 3 -> 'Retirado'
     *  - 4 -> 'Cancelado'
     */
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
