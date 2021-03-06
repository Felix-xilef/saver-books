import { Request, Response } from "express";
import { FindOptionsWhere, getRepository, LessThan } from "typeorm";

import { Reservation } from "../entities/operations/Reservation";
import { ReservationStatus } from "../entities/operations/ReservationStatus";
import { Book } from "../entities/books/Book";
import { ReservationJson } from "../interfaces/ReservationJson";
import { bookToJson } from "../interfaces/BookJson";
import { Client } from "../entities/clients/Client";
import { clientToJson } from "../interfaces/ClientJson";

const getReservationFromJson = async (
  reservationJson: ReservationJson,
): Promise<Reservation> => {
  const client = new Client(
    reservationJson.client.cpf,
    reservationJson.client.name,
    reservationJson.client.phone,
    reservationJson.client.email,
    reservationJson.client.blockStart,
    reservationJson.client.blockEnd,
  );

  const reservation = new Reservation(
    client,
    await getRepository(Book).findOne(reservationJson.bookIsbn, {
      relations: { genre: true },
    }),
    reservationJson.reservedDate,
    reservationJson.withdrawalDate,
    new ReservationStatus(reservationJson.reservationStatus.id),
  );

  if (reservationJson.id) reservation.id = reservationJson.id;

  return reservation;
};

const getJsonFromReservation = (reservation: Reservation): ReservationJson => {
  return {
    id: reservation.id,
    clientCpf: reservation.client.cpf,
    client: clientToJson(reservation.client),
    bookIsbn: reservation.book.isbn,
    book: bookToJson(reservation.book),
    reservedDate: reservation.reservedDate,
    withdrawalDate: reservation.withdrawalDate,
    reservationStatus: {
      id: reservation.reservationStatus.id,
      description: reservation.reservationStatus.description,
    },
  };
};

export class ReservationController {
  async select(request: Request, response: Response): Promise<Response> {
    const id = String(request.query.id);

    if (id) {
      try {
        const reservation: Reservation = await getRepository(
          Reservation,
        ).findOne(id, { relations: { reservationStatus: true, book: true } });

        if (reservation)
          response.status(200).json(getJsonFromReservation(reservation));
        else response.status(404).json({ error: "Reservation not found" });
      } catch (error) {
        response.status(500).json({ error: error.message });
      }
    } else
      response.status(400).json({ error: "id can't be null or undefined" });

    return response;
  }

  async selectAll(request: Request, response: Response): Promise<Response> {
    const isbn = request.query.isbn;
    const cpf = request.query.cpf;
    const isActive = request.query.isActive;

    let whereStatement: FindOptionsWhere<Reservation> = {};

    if (isbn && isbn != "") whereStatement.bookIsbn = String(isbn);

    if (Boolean(cpf) && cpf != "") whereStatement.clientCpf = String(cpf);

    if (isActive)
      whereStatement = [
        { ...whereStatement, reservationStatusId: 1 },
        { ...whereStatement, reservationStatusId: 2 },
      ];

    try {
      const reservations: Reservation[] = await getRepository(Reservation).find(
        {
          relations: {
            client: true,
            reservationStatus: true,
            book: { genre: true },
          },
          where: whereStatement,
        },
      );

      const reservationsJson: ReservationJson[] = [];

      reservations.forEach((element) => {
        reservationsJson.push(getJsonFromReservation(element));
      });

      response.status(200).json(reservationsJson);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }

    return response;
  }

  async saveEntry(request: Request, response: Response): Promise<Response> {
    const reservationRepository = getRepository(Reservation);

    try {
      const reservation = await reservationRepository.create(
        await getReservationFromJson(request.body),
      );

      if (reservation.id) {
        const oldReservation = await reservationRepository.findOne(
          reservation.id,
          {
            relations: {
              reservationStatus: true,
              book: { genre: true },
              client: true,
            },
          },
        );

        if (
          reservation.reservationStatus.id == 4 &&
          oldReservation.reservationStatus.id != 4
        ) {
          oldReservation.book.returnCopy();
          getRepository(Book).save(oldReservation.book);
        } else if (
          reservation.reservationStatus.id != 4 &&
          oldReservation.reservationStatus.id == 4
        ) {
          oldReservation.book.getCopy();
          getRepository(Book).save(oldReservation.book);
        }
      } else {
        reservation.book.getCopy();
        getRepository(Book).save(reservation.book);
      }

      reservationRepository.save(reservation);

      response.status(201).json(getJsonFromReservation(reservation));
    } catch (error) {
      response.status(500).json({ error: error.message });
    }

    return response;
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = String(request.query.id);

    if (id) {
      try {
        const reservation: Reservation = await getRepository(
          Reservation,
        ).findOne(id, { relations: { reservationStatus: true, book: true } });

        if (reservation) {
          getRepository(Reservation).remove(reservation);

          response.status(200).json(getJsonFromReservation(reservation));
        } else response.status(404).json({ error: "Reservation not found" });
      } catch (error) {
        response.status(500).json({ error: error.message });
      }
    } else
      response.status(400).json({ error: "id can't be null or undefined" });

    return response;
  }

  async scheduleUpdate() {
    console.log("In??cio Reservas. Data/Hora: ", new Date());

    const reservationRepository = getRepository(Reservation);
    const delayedReservations = await reservationRepository.find({
      relations: { book: true },
      where: {
        withdrawalDate: LessThan(new Date().toISOString().split("T")[0]),
        reservationStatusId: 1,
      },
    });

    delayedReservations.forEach((reservation) => {
      reservation.reservationStatus = new ReservationStatus(4);
      reservationRepository.save(reservation);

      reservation.book.returnCopy();
      getRepository(Book).save(reservation.book);
    });

    console.log("Todos as reservas percorridas. Data/Hora: ", new Date());
  }
}
