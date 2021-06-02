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

const userRepository = getRepository(User);

export class UserController {
    async select(request: Request, response: Response): Promise<Response> {
        const cpf = String(request.query.cpf);

        if (cpf) {
            const user: User = await userRepository.findOne(cpf, { relations: { userType: true } });

            if (user) response.status(200).json(getJsonFromUser(getJsonFromUser(user)));
            else response.status(404).json({ "error": "User not found" });

        } else {
            response.status(400).json({ "error": "cpf can't be null or undefined" });
        }

        return response;
    }
    
    async selectAll(request: Request, response: Response): Promise<Response> {
        const users: User[] = await userRepository.find({ relations: { userType: true } });

        let usersJson: UserJson[] = [];

        users.forEach((element) => {
            usersJson.push(getJsonFromUser(element));
        });

        response.status(200).json(usersJson)

        return response;
    }
    
    async saveEntry(request: Request, response: Response): Promise<Response> {
        const receivedJson = request.body

        const user = await userRepository.create(getUserFromJson(receivedJson));

        try {
            userRepository.save(user);
            response.status(201).json(receivedJson)
        } catch (error) {
            response.status(500).json({ "error": error.message })
        }

        return response;
    }
    
    async delete(request: Request, response: Response): Promise<Response> {
        const cpf = String(request.query.cpf);

        if (cpf) {
            const user: User = await userRepository.findOne(cpf, { relations: { userType: true } });

            if (user) {
                userRepository.remove(user);
                response.status(200).json(getJsonFromUser(user));
            } else response.status(404).json({ "error": "User not found" });

        } else response.status(400).json({ "error": "cpf can't be null or undefined" });


        return response;
    }
}