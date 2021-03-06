import { User } from "../entities/users/User";
import { UserJson } from "../interfaces/UserJson";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { TokenPayload } from "interfaces/TokenPayload";

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
      description: user.userType.description,
    },
  };
};

export class AuthController {
  async authenticate(request: Request, response: Response): Promise<Response> {
    const { cpf, password, token } = request.body;
    
    if (token) {
      try {
        const { cpf: tokenCpf } = verify(
          token,
          process.env.SECRET,
        ) as TokenPayload;

        const user = await getRepository(User).findOne(tokenCpf, {
          relations: { userType: true },
        });
        
        if (user) response.status(200).json({ user: getJsonFromUser(user) });
        else response.status(401).json({ message: "Unauthorized" });

        return response;

      } catch {
        return response.status(401).json({ error: "not authorized" });
      }
    } else if (cpf && password) {
      const user: User = await getRepository(User).findOne(cpf, {
        select: [
          "birthDate",
          "cpf",
          "email",
          "name",
          "password",
          "phone",
          "userType",
        ],
        relations: { userType: true },
      });

      if (user) {
        const passwordIsValid = await compare(password, user.password);

        if (passwordIsValid) {
          delete user.password;

          const token = sign({ cpf: user.cpf }, process.env.SECRET, {
            expiresIn: "30d",
          });

          response.status(200).json({
            user: getJsonFromUser(user),
            token,
          });
        } else response.status(401).json({ error: "n??o autorizado" });
      } else response.status(401).json({ error: "n??o autorizado" });
    } else {
      response
        .status(400)
        .json({ error: "cpf and password can't be null or undefined" });
    }

    return response;
  }
}
