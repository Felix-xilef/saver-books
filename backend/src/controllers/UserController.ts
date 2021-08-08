import { User } from "../entities/users/User";
import { UserType } from "../entities/users/UserType";
import { UserJson } from "../interfaces/UserJson";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

const getUserFromJson = (userJson: UserJson): User => {
    return new User(
        userJson.cpf,
        userJson.name,
        userJson.birthDate,
        userJson.phone,
        userJson.email,
        userJson.password,
        new UserType(userJson.userType.id)
    );
}

const getJsonFromUser = (user: User): UserJson => {
    return {
        cpf: user.cpf,
        name: user.name,
        birthDate: user.birthDate,
        phone: user.phone,
        email: user.email,
        password: user.password,
        userType: {
            id: user.userType.id,
            description: user.userType.description
        }
    };
}

export class UserController {
    async select(request: Request, response: Response): Promise<Response> {
        const cpf = String(request.query.cpf);

        if (cpf) {
            try {
                const user: User = await getRepository(User).findOne(cpf, { relations: { userType: true } });

                if (user) response.status(200).json(getJsonFromUser(user));
                else response.status(404).json({ "error": "User not found" });

            } catch (error) {
                response.status(500).json({ "error": error.message });;
            }
        } else {
            response.status(400).json({ "error": "cpf can't be null or undefined" });
        }

        return response;
    }
    
    async selectAll(request: Request, response: Response): Promise<Response> {
        try {
            const users: User[] = await getRepository(User).find({ relations: { userType: true } });
    
            let usersJson: UserJson[] = [];
    
            users.forEach((element) => {
                usersJson.push(getJsonFromUser(element));
            });
    
            response.status(200).json(usersJson)

        } catch (error) {
            response.status(500).json({ "error": error.message });;
        }

        return response;
    }
    
    async saveEntry(request: Request, response: Response): Promise<Response> {
        try {
            const user = await getRepository(User).create(getUserFromJson(request.body));

            getRepository(User).save(user);

            response.status(201).json(getJsonFromUser(user));

        } catch (error) {
            response.status(500).json({ "error": error.message });
        }

        return response;
    }
    
    async delete(request: Request, response: Response): Promise<Response> {
        const cpf = String(request.query.cpf);

        if (cpf) {
            try {
                const user: User = await getRepository(User).findOne(cpf, { relations: { userType: true } });
    
                if (user) {
                    getRepository(User).remove(user);

                    response.status(200).json(getJsonFromUser(user));

                } else response.status(404).json({ "error": "User not found" });
            } catch (error) {
                response.status(500).json({ "error": error.message });
            }
        } else response.status(400).json({ "error": "cpf can't be null or undefined" });

        return response;
    }
}