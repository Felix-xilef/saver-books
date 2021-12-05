import { Loan } from "../entities/operations/Loan";
import { Operation } from "../entities/operations/Operation";
import { Reservation } from "../entities/operations/Reservation";
import { Request, Response } from "express";
import { Reports } from "../interfaces/Reports";
import { Between, getRepository } from "typeorm";

const getMonthLabel = (date: Date): string => {
  return (
    date.toLocaleString("pt-br", { month: "long" }).charAt(0).toUpperCase() +
    date.toLocaleString("pt-br", { month: "long" }).slice(1) +
    " / " +
    date.getFullYear()
  );
};

export class ReportController {
  async calculate(request: Request, response: Response): Promise<Response> {
    if (!request.query.startDate || !request.query.endDate) {
      return response.status(400).json({
        error: "Both initial date and final date have to be informed!",
      });
    }

    const startDate: Date = new Date(String(request.query.startDate));
    const endDate: Date = new Date(`${String(request.query.endDate)} 23:59:59`);

    const reports: Reports = {
      operationsReport: {
        labels: [],
        datasets: [
          {
            label: "Reserva",
            data: [],
          },
          {
            label: "Empréstimo",
            data: [],
          },
        ],
      },

      reservationStatusReport: {
        labels: ["Aberto", "Atrasado", "Retirado", "Cancelado"],
        datasets: [
          {
            label: "Situação das Reservas",
            data: [0, 0, 0, 0],
          },
        ],
      },

      loanStatusReport: {
        labels: ["Retirado", "Atrasado", "Devolvido"],
        datasets: [
          {
            label: "Situação dos Empréstimos",
            data: [0, 0, 0],
          },
        ],
      },
    };

    for (
      let date = new Date(startDate.getTime());
      date <= endDate;
      date.setMonth(date.getMonth() + 1)
    ) {
      reports.operationsReport.labels.push(getMonthLabel(date));
      reports.operationsReport.datasets.forEach((dataset) =>
        dataset.data.push(0),
      );
    }

    let operations: Operation[] = await getRepository(Reservation).find({
      relations: {
        reservationStatus: true,
        book: { genre: true },
        client: true,
      },
      where: {
        reservedDate: Between(
          startDate.toISOString().slice(0, 19),
          endDate.toISOString().slice(0, 19),
        ),
      },
    });

    operations = operations.concat(
      await getRepository(Loan).find({
        relations: { loanStatus: true, book: { genre: true }, client: true },
        where: {
          withdrawalDate: Between(
            startDate.toISOString().slice(0, 19),
            endDate.toISOString().slice(0, 19),
          ),
        },
      }),
    );

    operations.forEach((operation) => {
      if (operation instanceof Reservation) {
        reports.reservationStatusReport.datasets[0].data[
          operation.reservationStatus.id - 1
        ]++;
        reports.operationsReport.datasets[0].data[
          reports.operationsReport.labels.indexOf(
            getMonthLabel(operation.reservedDate),
          )
        ]++;
      } else if (operation instanceof Loan) {
        reports.loanStatusReport.datasets[0].data[
          operation.loanStatus.id - 1
        ]++;
        reports.operationsReport.datasets[1].data[
          reports.operationsReport.labels.indexOf(
            getMonthLabel(operation.withdrawalDate),
          )
        ]++;
      }
    });

    return response.status(200).json({ ...reports });
  }
}
