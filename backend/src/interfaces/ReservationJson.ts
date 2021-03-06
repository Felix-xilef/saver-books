import { Reservation } from "../entities/operations/Reservation";
import { jsonToBook } from "./BookJson";
import { jsonToClient } from "./ClientJson";
import { OperationJson, operationToJson } from "./OperationJson";
import {
  jsonToReservationStatus,
  ReservationStatusJson,
  reservationStatusToJson,
} from "./SubTypesJson";

export interface ReservationJson extends OperationJson {
  reservedDate: Date;

  withdrawalDate: Date;

  reservationStatus: ReservationStatusJson;
}

export function reservationToJson(
  reservationObject: Reservation,
): ReservationJson {
  return {
    ...operationToJson(reservationObject),
    reservedDate: reservationObject.reservedDate,
    withdrawalDate: reservationObject.withdrawalDate,
    reservationStatus: reservationStatusToJson(
      reservationObject.reservationStatus,
    ),
  };
}

export function jsonToReservation(
  reservationJson: ReservationJson,
): Reservation {
  return new Reservation(
    jsonToClient(reservationJson.client),
    jsonToBook(reservationJson.book),
    reservationJson.reservedDate,
    reservationJson.withdrawalDate,
    jsonToReservationStatus(reservationJson.reservationStatus),
  );
}
