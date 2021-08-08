import { Request, Response, NextFunction } from "express";
import { TokenPayload } from "interfaces/TokenPayload";
import { verify } from "jsonwebtoken";

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
	if (request.path == '/authenticate') return next();

	const { authorization } = request.headers;

	if (!authorization) return response.status(401).json({ "error": "not authorized" });

	const token = authorization.replace('Bearer', '').trim();

	try {
		const data = verify(token, process.env.SECRET);

		const { cpf } = data as TokenPayload;

		request.query.userCpf = cpf;

		return next();

	} catch {
		return response.status(401).json({ "error": "not authorized" });
	}
}
