import { User } from "../entities/users/User";
import { jsonToUserType, UserTypeJson, userTypeToJson } from "./SubTypesJson";

export interface UserJson {
    cpf: string,

    name: string,

    birthDate: string,

    phone: string,

    email: string,

    password?: string,

    userType: UserTypeJson;
}

export function userToJson(userObject: User): UserJson {
    return {
        cpf: userObject.cpf,
        name: userObject.name,
        birthDate: userObject.birthDate,
        phone: userObject.phone,
        email: userObject.email,
        userType: userTypeToJson(userObject.userType)
    };
}

export function jsonToUser(userJson: UserJson): User {
    return new User(
        userJson.cpf,
        userJson.name,
        userJson.birthDate,
        userJson.phone,
        userJson.email,
        userJson.password,
        jsonToUserType(userJson.userType)
    );
}
