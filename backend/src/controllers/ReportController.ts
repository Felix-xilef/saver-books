import { Loan } from "../entities/operations/Loan";
import { Reservation } from "../entities/operations/Reservation";
import { Request, Response } from "express";
import { Between, getRepository } from "typeorm";
import { ReservationStatus } from "entities/operations/ReservationStatus";

export class ReportController {
    async calculate(request: Request, response: Response): Promise<Response> {
        const initialDate: Date = new Date(String(request.query.initialDate));
        const finalDate: Date = new Date(String(request.query.finalDate));

        const reservationRepository = getRepository(Reservation);
        const loanRepository = getRepository(Loan);

        var responseData = {
            monthly: [],
            reservationStatus: {
                open: 0,
                late: 0,
                withdrawn: 0,
                canceled: 0
            },
            loanStatus: {
                withdrawn: 0,
                late: 0,
                returned: 0
            },
        };

        const reservations: Reservation[] = await reservationRepository.find({ where: {
            reservedDate: Between(initialDate, finalDate)
        }, order: {
            reservedDate: 'ASC'
        }});

        const loans: Loan[] = await loanRepository.find({ where: {
            withdrawalDate: Between(initialDate, finalDate)
        }, order: {
            withdrawalDate: 'ASC'
        }});

        const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        [reservations, loans].map((element, id) => {
            var month = initialDate.getMonth();
            var year = initialDate.getFullYear();
            var monthCount = 0;
            var responseStatus;
            
            if (id == 0) {
                responseStatus = responseData.reservationStatus;
            } else {
                responseStatus = responseData.loanStatus;
            }

            element.map((subElement) => {
                responseStatus[subElement[8].id-1]++;
    
                if (subElement[6].getMonth() != month) {
                    responseData.monthly.push({
                        month: `${monthNames[month]}/${year}`,
                        count: monthCount
                    });
                    monthCount = 0;
                    month = subElement[6].getMonth();
                    year = subElement[6].getFullYear();
                }
    
                monthCount++;
            });
        });

        response.status(200).json(responseData);

        return response;
    }
}