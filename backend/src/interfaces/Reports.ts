interface Report {
  labels: string[];

  datasets: {
    label: string;
    data: number[];
  }[];
}

interface OperationsReport extends Omit<Report, 'datasets'> {
  datasets: [
    {
      label: 'Reserva';
      data: number[];
    },
    {
      label: 'Empréstimo';
      data: number[];
    },
  ];
}

interface StatusesReport extends Report {
}

export interface Reports {
  operationsReport: OperationsReport;

  reservationStatusReport: StatusesReport;

  loanStatusReport: StatusesReport;
}
