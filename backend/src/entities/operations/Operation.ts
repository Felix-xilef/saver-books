import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Book } from "../books/Book";
import { Client } from "../clients/Client";

export abstract class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientCpf: string;
  @ManyToOne(() => Client)
  client: Client;

  @Column()
  bookIsbn: string;
  @ManyToOne(() => Book)
  book: Book;

  constructor(client: Client, book: Book) {
    this.client = client;
    this.book = book;
  }
}
