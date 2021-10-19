import { Book } from "../entities/books/Book";
import { Genre } from "../entities/books/Genre";
import { BookJson } from "../interfaces/BookJson";
import { Request, Response } from "express";
import { FindOptionsWhere, getRepository, Like } from "typeorm";

const getBookFromJson = async (bookJson: BookJson): Promise<Book> => {
  return new Book(
    bookJson.isbn,
    bookJson.language,
    bookJson.title,
    bookJson.author,
    bookJson.publicDate,
    bookJson.publisher,
    await getRepository(Genre).findOne(bookJson.genre.id),
    bookJson.summary,
    bookJson.availCopies,
    bookJson.cover,
  );
};

const getJsonFromBook = (book: Book): BookJson => {
  return {
    isbn: book.isbn,
    language: book.language,
    title: book.title,
    author: book.author,
    publicDate: book.publicDate,
    publisher: book.publisher,
    genre: {
      id: book.genre.id,
      description: book.genre.description,
    },
    summary: book.summary,
    availCopies: book.availCopies,
    unavailCopies: book.unavailCopies,
    cover: book.cover,
  };
};

const generateLikeStatement = (param: string) => {
  return Like(`%${param.replace(" ", "%")}%`);
};

export class BookController {
  async select(request: Request, response: Response): Promise<Response> {
    const isbn = String(request.query.isbn);

    if (isbn) {
      try {
        const book: Book = await getRepository(Book).findOne(isbn, {
          relations: { genre: true },
        });

        if (book) response.status(200).json(getJsonFromBook(book));
        else response.status(404).json({ error: "Book not found" });
      } catch (error) {
        response.status(500).json({ error: error.message });
      }
    } else
      response.status(400).json({ error: "isbn can't be null or undefined" });

    return response;
  }

  async selectAll(request: Request, response: Response): Promise<Response> {
    const title = request.query.title;
    const isbn = request.query.isbn;
    const author = request.query.author;

    const whereStatement: FindOptionsWhere<Book> = {};

    if (title && title != "")
      whereStatement.title = generateLikeStatement(String(title));
    if (isbn && isbn != "")
      whereStatement.isbn = generateLikeStatement(String(isbn));
    if (author && author != "")
      whereStatement.author = generateLikeStatement(String(author));

    try {
      const books: Book[] = await getRepository(Book).find({
        relations: { genre: true },
        where: whereStatement,
      });

      const booksJson: BookJson[] = [];

      books.forEach((element) => {
        booksJson.push(getJsonFromBook(element));
      });

      response.status(200).json(booksJson);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }

    return response;
  }

  async saveEntry(request: Request, response: Response): Promise<Response> {
    try {
      const book = await getRepository(Book).create(
        await getBookFromJson(request.body),
      );

      getRepository(Book).save(book);

      response.status(201).json(getJsonFromBook(book));
    } catch (error) {
      response.status(500).json({ error: error.message });
    }

    return response;
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const isbn = String(request.query.isbn);

    if (isbn) {
      try {
        const book: Book = await getRepository(Book).findOne(isbn, {
          relations: { genre: true },
        });

        if (book) {
          getRepository(Book).remove(book);

          response.status(200).json(getJsonFromBook(book));
        } else response.status(404).json({ error: "Book not found" });
      } catch (error) {
        response.status(500).json({ error: error.message });
      }
    } else
      response.status(400).json({ error: "isbn can't be null or undefined" });

    return response;
  }
}
