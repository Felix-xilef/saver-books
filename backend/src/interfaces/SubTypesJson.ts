export interface SubTypesJson {
    id: number,

    description: string
}

export interface GenreJson extends SubTypesJson {}

export interface UserTypeJson extends SubTypesJson {}

export interface ReservationStatusJson extends SubTypesJson {}

export interface LoanStatusJson extends SubTypesJson {}
