import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class UserType {

    @PrimaryColumn()
    id: number;

    @Column()
    description: string;

    /**
     * Creates a new UserType object
     * @param id Object id, insert:
     *  - 1 -> 'Gerente'
     *  - 2 -> 'Bibliotecário'
     */
    constructor(id: number) {
        let description = [
            'Gerente',
            'Bibliotecário'
        ]

        this.id = id;
        this.description = description[id-1];
    }
}
