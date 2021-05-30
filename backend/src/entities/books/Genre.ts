import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Genre {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    constructor(description: string) {
        this.description = description;
    }
}
