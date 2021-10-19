import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Genre } from "../entities/books/Genre";
import { UserType } from "../entities/users/UserType";
import { ReservationStatus } from "../entities/operations/ReservationStatus";
import { LoanStatus } from "../entities/operations/LoanStatus";

export class SubTypesController {
  async getGenres(request: Request, response: Response): Promise<Response> {
    try {
      const genres: Genre[] = await getRepository(Genre).find();

      response.status(200).json(genres);
    } catch (error) {
      response.status(500).json({ error: error });
    }

    return response;
  }

  async getUserTypes(request: Request, response: Response): Promise<Response> {
    try {
      const userTypes: UserType[] = await getRepository(UserType).find();

      response.status(200).json(userTypes);
    } catch (error) {
      response.status(500).json({ error: error });
    }

    return response;
  }

  async getReservationStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const reservationStatus: ReservationStatus[] = await getRepository(
        ReservationStatus,
      ).find();

      response.status(200).json(reservationStatus);
    } catch (error) {
      response.status(500).json({ error: error });
    }

    return response;
  }

  async getLoanStatus(request: Request, response: Response): Promise<Response> {
    try {
      const loanStatus: LoanStatus[] = await getRepository(LoanStatus).find();

      response.status(200).json(loanStatus);
    } catch (error) {
      response.status(500).json({ error: error });
    }

    return response;
  }
}
