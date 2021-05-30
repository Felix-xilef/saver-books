import { OperationJson } from "./OperationJson";
import { ReservationStatusJson } from "./SubTypesJson";

export interface ReservationJson extends OperationJson {
    reservedDate: Date;

    withdrawalDate: Date;

    reservationStatus: ReservationStatusJson;
}
