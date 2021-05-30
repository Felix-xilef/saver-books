import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class LoanStatus {

    @PrimaryColumn()
    id: number;

    @Column()
    description: string;

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
