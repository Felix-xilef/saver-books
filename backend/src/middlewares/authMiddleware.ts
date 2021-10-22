import { Request, Response, NextFunction } from "express";
import { TokenPayload } from "interfaces/TokenPayload";
import { verify } from "jsonwebtoken";

const pathsWithNoRestriction = [
  '/authenticate',
  '/client',
  '/clients',
  '/reservation'
];

const pathsWithNoRestrictionForGET = [
  '/book',
  '/books'
];

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (
    pathsWithNoRestriction.includes(request.path) ||
    (request.method == 'GET' && pathsWithNoRestrictionForGET.includes(request.path)) ||
    request.path.substr(0, 7) == "/public"
  ) return next();

  const { authorization } = request.headers;

  if (!authorization)
    return response.status(401).json({ error: "not authorized" });

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = verify(token, process.env.SECRET);

    const { cpf } = data as TokenPayload;

    request.query.userCpf = cpf;

    return next();
  } catch {
    return response.status(401).json({ error: "not authorized" });
  }
}
