import { GenreJson } from "./SubTypesJson";

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

    genre: GenreJson;
}
