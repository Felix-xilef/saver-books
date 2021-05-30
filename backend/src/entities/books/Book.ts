import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import { Genre } from "./Genre";

@Entity()
export class Book {

    @PrimaryColumn()
    isbn: string;

    @Column()
    language: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column('date')
    publicDate: Date;

    @Column()
    publisher: string;

    @Column()
    summary: string;

    @Column()
    availCopies: number;

    @Column()
    unavailCopies: number;

    @ManyToOne(() => Genre)
    genre: Genre;

    constructor(
        isbn: string,
        language: string,
        title: string,
        author: string,
        publicDate: Date,
        publisher: string,
        genre: Genre,
        summary: string,
        availCopies: number
    ) {
        this.isbn = isbn;
        this.language = language;
        this.title = title;
        this.author = author;
        this.publicDate = publicDate;
        this.publisher = publisher;
        this.genre = genre;
        this.summary = summary;
        this.availCopies = availCopies;
        this.unavailCopies = 0;
    }
}
