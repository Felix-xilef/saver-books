import { UserTypeJson } from "./SubTypesJson";

export interface UserJson {
    cpf: string,

    name: string,

    birthDate: string,

    phone: string,

    email: string,

    password: string,

    userType: UserTypeJson;
}
