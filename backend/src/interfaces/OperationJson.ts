import { Operation } from "../entities/operations/Operation";
import { BookJson, bookToJson } from "./BookJson";

export interface OperationJson {
    id: number;

    cpf: string;

    name: string;

    phone: string;

    email: string;

    bookIsbn: string;

    book: BookJson;
}

export function operationToJson(operationObject: Operation): OperationJson {
    return {
        id: operationObject.id,
        cpf: operationObject.cpf,
        name: operationObject.name,
        phone: operationObject.phone,
        email: operationObject.email,
        bookIsbn: operationObject.book.isbn,
        book: bookToJson(operationObject.book),
    };
}
