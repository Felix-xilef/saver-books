import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class UserType {

    @PrimaryColumn()
    id: number;

    @Column()
    description: string;

    constructor(id: number) {
        let description = [
            'Gerente',
            'Bibliotecário'
        ]

        this.id = id;
        this.description = description[id-1];
    }
}
