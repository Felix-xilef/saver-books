import { Book } from "../entities/books/Book";
import { GenreJson, genreToJson, jsonToGenre } from "./SubTypesJson";

export interface BookJson {
    isbn: string;

    language: string;

    title: string;

    author: string;

    publicDate: Date;

    publisher: string;

    summary: string;

    availCopies: number;

    unavailCopies: number;

    cover: string;

    genre: GenreJson;
}

export function bookToJson(bookObject: Book): BookJson {
    return {
        isbn: bookObject.isbn,
        language: bookObject.language,
        title: bookObject.title,
        author: bookObject.author,
        publicDate: bookObject.publicDate,
        publisher: bookObject.publisher,
        genre: genreToJson(bookObject.genre),
        summary: bookObject.summary,
        availCopies: bookObject.availCopies,
        unavailCopies: bookObject.unavailCopies,
        cover: bookObject.cover
    };
}

export function jsonToBook(bookJson: BookJson): Book {
    return new Book(
        bookJson.isbn,
        bookJson.language,
        bookJson.title,
        bookJson.author,
        bookJson.publicDate,
        bookJson.publisher,
        jsonToGenre(bookJson.genre),
        bookJson.summary,
        bookJson.availCopies,
        bookJson.cover
    );
}
