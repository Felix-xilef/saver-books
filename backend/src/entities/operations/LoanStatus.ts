import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class LoanStatus {

    @PrimaryColumn()
    id: number;

    @Column()
    description: string;

    /**
     * Creates a new LoanStatus object
     * @param id Object id, insert:
     *  - 1 -> 'Retirado'
     *  - 2 -> 'Atrasado'
     *  - 3 -> 'Devolvido'
     */
    constructor(id: number) {
        let description = [
            'Retirado',
            'Atrasado',
            'Devolvido'
        ];
        this.id = id;
        this.description = description[id-1];
    }
}
