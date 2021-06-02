import { OperationJson } from "./OperationJson";
import { LoanStatusJson } from "./SubTypesJson";

export interface LoanJson extends OperationJson {
    withdrawalDate: Date;

    returnDate: Date;

    loanStatus: LoanStatusJson;

    reservationId?: number;
}
