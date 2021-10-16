import { ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Book } from "../books/Book";
import { Client } from "../clients/Client";

export abstract class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client)
  client: Client;

  @ManyToOne(() => Book)
  book: Book;

  constructor(client: Client, book: Book) {
    this.client = client;
    this.book = book;
  }
}
