import { Client } from "../entities/clients/Client";
import { Operation } from "../entities/operations/Operation";
import { BookJson, bookToJson } from "./BookJson";
import { clientToJson } from "./ClientJson";

export interface OperationJson {
    id: number;

    clientCpf: string;

    client: Client;

    bookIsbn: string;

    book?: BookJson;
}

export function operationToJson(operationObject: Operation): OperationJson {
    return {
        id: operationObject.id,
        clientCpf: operationObject.client.cpf,
        client: clientToJson(operationObject.client),
        bookIsbn: operationObject.book.isbn,
        book: bookToJson(operationObject.book),
    };
}
