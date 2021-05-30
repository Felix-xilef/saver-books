import { Book } from "../books/Book";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export abstract class Operation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cpf: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @ManyToOne(() => Book)
    book: Book;

    constructor(
        cpf: string,
        name: string,
        phone: string,
        email: string,
        book: Book
    ) {
        this.cpf = cpf;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.book = book;
    }
}