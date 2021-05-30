import { User } from "../entities/users/User";
import { UserType } from "../entities/users/UserType";
import { Request, Response } from "express";
import { UserJson } from "interfaces/UserJson";
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

        try {
            if (cpf) {
                const user: User = await getRepository(User).findOne(cpf);
    
                if (user) response.status(200).json(getJsonFromUser(getJsonFromUser(user)));
                else response.status(404).json({ "error": "User not found" });
            } else {
                response.status(400).json({ "error": "cpf can't be null or undefined" });
            }
        } catch (error) {
            response.status(500).json({ "error": error.message })
        }

        return response;
    }
    
    selectAll(request: Request, response: Response): Response {
        return response;
    }
    
    insert(request: Request, response: Response): Response {
        const receivedJson = request.body

        try {
            const user = getRepository(User).create(getUserFromJson(receivedJson));
            try {
                getRepository(User).save(user);
                response.status(201).json(receivedJson)
            } catch (error) {
                response.status(500).json({ "error": error.message })
            }
        } catch (error) {
            response.status(400).json({ "error": error.message })
        }

        return response;
    }
    
    update(request: Request, response: Response): Response {
        return response;
    }
    
    delete(request: Request, response: Response): Response {
        return response;
    }
}