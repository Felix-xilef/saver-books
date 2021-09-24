<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <canvas id="operationsChart" class="barChart"></canvas>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <canvas id="reservationStatusChart" class="pieCharts"></canvas>
      </div>

      <div class="col-6">
        <canvas id="loanStatusChart" class="pieCharts"></canvas>
      </div>
    </div>
  </div>

  <alert :logMessage="log.message" :error="log.error" :success="log.success" />
</template>

<script>
import ReportService from '../shared/services/ReportService';
import Alert from '../shared/components/Alert.vue';
import Chart from 'chart.js/auto';
export default {
  components: { Alert },
  name: 'Reports',
  data() {
    return {
      log: {
        message: '',
        error: false,
        success: false,
      },
      startDate: '',
      endDate: '',
      operationsChart: null,
      reservationStatusChart: null,
      loanStatusChart: null,
      delayed: false,
      backgroundColors: ['#0061d871', '#ff000080', '#10c20079', '#ee9e267e'],
      borderColors: ['0063d8', '#ff0000', '10c200', '#ee9e26'],
    }
  },
  methods: {
		error(message) {
			this.log.message = message;
			this.log.success = false;
			this.log.error = true;
		},
    generateChart(element, type, data, title) {
      return new Chart(
        element,
        {
          type: type,
          data: data,
          options: {
            animation: {
              onComplete: () => {
                this.delayed = true;
              },
              delay: context => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !this.delayed) {
                  delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: title,
              },
            },
            elements: type == 'pie' ? {
              arc: {
                backgroundColor: context => this.backgroundColors[context.dataIndex],
              },
            } : {},
          },
        }
      )
    },
    getReport() {
      ReportService.getReport(this.startDate, this.endDate).then(response => {
        console.log(response.data);

        response.data.operationsReport.datasets[0].borderColor = this.borderColors[0];
        response.data.operationsReport.datasets[0].backgroundColor = this.backgroundColors[0];

        response.data.operationsReport.datasets[1].borderColor = this.borderColors[2];
        response.data.operationsReport.datasets[1].backgroundColor = this.backgroundColors[2];
        
        this.operationsChart = this.generateChart(
          document.getElementById('operationsChart'),
          'bar',
          response.data.operationsReport,
          'Reservas e Empréstimos realizados ao longo dos meses'
        );

        this.reservationStatusChart = this.generateChart(
          document.getElementById('reservationStatusChart'),
          'pie',
          response.data.reservationStatusReport,
          'Situação das Reservas realizadas'
        );

        this.loanStatusChart = this.generateChart(
          document.getElementById('loanStatusChart'),
          'pie',
          response.data.loanStatusReport,
          'Situação dos Empréstimos realizadas'
        );

      }).catch(err => this.error('Erro ao recuperar relatórios: ' + err));
    },
  },
  mounted() {
    this.getReport();
  },
}
</script>

<style scoped>
</style>