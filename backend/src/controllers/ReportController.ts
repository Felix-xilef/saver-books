import { Request, Response } from "express";
import { Reports } from "interfaces/Reports";

export class ReportController {
    async calculate(request: Request, response: Response): Promise<Response> {
        const initialDate: Date = new Date(String(request.query.initialDate));
        const finalDate: Date = new Date(String(request.query.finalDate));
        
        let reports: Reports = {
            operationsReport: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
                datasets: [
                    {
                        label: 'Reserva',
                        data: [40, 55, 32, 21, 19, 22],
                    },
                    {
                        label: 'Empréstimo',
                        data: [36, 49, 30, 20, 19, 20],
                    },
                ],
            },
            
            reservationStatusReport: {
                labels: ['Aberto', 'Atrasado', 'Retirado', 'Cancelado'],
                datasets: [
                    {
                        label: 'Situação das Reservas',
                        data: [2, 6, 174, 7],
                    },
                ],
            },

            loanStatusReport: {
                labels: ['Retirado', 'Atrasado', 'Devolvido'],
                datasets: [
                    {
                        label: 'Situação dos Empréstimos',
                        data: [19, 5, 150],
                    },
                ],
            }
        };

        return response.status(200).json({ ...reports });
    }
}
