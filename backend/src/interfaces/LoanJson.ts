import { Loan } from "../entities/operations/Loan";
import { jsonToBook } from "./BookJson";
import { jsonToClient } from "./ClientJson";
import { OperationJson } from "./OperationJson";
import { jsonToLoanStatus, LoanStatusJson, loanStatusToJson } from "./SubTypesJson";

export interface LoanJson extends OperationJson {
    withdrawalDate: Date;

    returnDate: Date;

    loanStatus: LoanStatusJson;

    reservationId?: number;
}

export function loanToJson(loanObject: Loan): LoanJson {
    return {
        ...loanToJson(loanObject),
        withdrawalDate: loanObject.withdrawalDate,
        returnDate: loanObject.returnDate,
        loanStatus: loanStatusToJson(loanObject.loanStatus)
    };
}

export function jsonToLoan(loanJson: LoanJson): Loan {
    return new Loan(
        jsonToClient(loanJson.client),
        jsonToBook(loanJson.book),
        loanJson.withdrawalDate,
        loanJson.returnDate,
        jsonToLoanStatus(loanJson.loanStatus)
    );
}
