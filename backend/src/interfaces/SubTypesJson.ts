import { Genre } from "../entities/books/Genre";
import { LoanStatus } from "../entities/operations/LoanStatus";
import { ReservationStatus } from "../entities/operations/ReservationStatus";
import { UserType } from "../entities/users/UserType";

// Generict Parent
export interface SubTypesJson {
  id: number;

  description: string;
}

export function subTypeToJson(
  subTypeObject: Genre | UserType | ReservationStatus | LoanStatus,
): SubTypesJson {
  return subTypeObject
    ? {
        id: subTypeObject.id,
        description: subTypeObject.description,
      }
    : undefined;
}

// Genre
export type GenreJson = SubTypesJson;

export function genreToJson(genreObject: Genre): GenreJson {
  return subTypeToJson(genreObject);
}

export function jsonToGenre(genreJson: GenreJson): Genre {
  return new Genre(genreJson.id, genreJson.description);
}

// UserType
export type UserTypeJson = SubTypesJson;

export function userTypeToJson(userTypeObject: UserType): UserTypeJson {
  return subTypeToJson(userTypeObject);
}

export function jsonToUserType(userTypeJson: UserTypeJson): UserType {
  return new UserType(userTypeJson.id);
}

// ReservationStatus
export type ReservationStatusJson = SubTypesJson;

export function reservationStatusToJson(
  reservationStatusObject: ReservationStatus,
): ReservationStatusJson {
  return subTypeToJson(reservationStatusObject);
}

export function jsonToReservationStatus(
  reservationStatusJson: ReservationStatusJson,
): ReservationStatus {
  return new ReservationStatus(reservationStatusJson.id);
}

// LoanStatus
export type LoanStatusJson = SubTypesJson;

export function loanStatusToJson(loanStatusObject: LoanStatus): LoanStatusJson {
  return subTypeToJson(loanStatusObject);
}

export function jsonToLoanStatus(loanStatusJson: LoanStatusJson): LoanStatus {
  return new LoanStatus(loanStatusJson.id);
}
