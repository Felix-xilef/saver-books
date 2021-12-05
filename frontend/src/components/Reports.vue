<template>
  <div class="container">
    <div class="row justify-content-center mb-4">
      <div class="col-xl-8 col-md-10 col-sm-12">
        <canvas id="operationsChart" class="barChart"></canvas>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-xl-4 col-md-6 col-sm-12 mb-4">
        <canvas id="reservationStatusChart" class="pieCharts"></canvas>
      </div>

      <div class="col-xl-4 col-md-6 col-sm-12 mb-4">
        <canvas id="loanStatusChart" class="pieCharts"></canvas>
      </div>

      <form class="col-xl-3 col-md-5 col-sm-10 d-flex flex-column justify-content-center" @submit.prevent="submit">
        <h5>Selecione o intervalo:</h5>
        
        <div class="mb-3">
          <label for="startDate" class="form-label">De:</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            class="form-control"
            :class="{ 'is-valid': controlIsValid('startDate'), 'is-invalid': controlHasError('startDate') }"
            v-model="rangeForm.startDate"
            :max="rangeForm.endDate ? rangeForm.endDate : getDateString()"
          >
          <div class="invalid-feedback">
            <span v-if="rangeForm.startDate == ''">
              A data inicial é obrigatória
            </span>
            <span v-else>
              A data inicial deve ser menor que a data final
            </span>
          </div>
        </div>

        <div class="mb-3">
          <label for="endDate" class="form-label">Até:</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            class="form-control"
            :class="{ 'is-valid': controlIsValid('endDate'), 'is-invalid': controlHasError('endDate') }"
            v-model="rangeForm.endDate"
            :min="rangeForm.startDate"
            :max="getDateString()"
          >
          <div class="invalid-feedback">
            <span v-if="rangeForm.endDate == ''">
              A data final é obrigatória
            </span>
            <span v-else>
              A data final deve ser maior que a data inicial e menor que a data atual
            </span>
          </div>
        </div>

        <button
          type="submit"
          class="btn text-white outlinedOnHover"
          :class="{ 'backgroundGradientBlue': rangeFormIsValid, 'backgroundGradientDisabled': !rangeFormIsValid }"
          :disabled="!rangeFormIsValid"
        >
          <p>Atualizar Relatórios</p>
        </button>
      </form>
    </div>
  </div>

  <alert
    :logMessage="log.message"
    :error="log.status.error"
    @closed="alert(null, null)"
  />
</template>

<script>
import ReportService from '../shared/services/ReportService';
import Alert from '../shared/components/Alert.vue';
import Chart from 'chart.js/auto';
import vuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import maxDateValidator from '../shared/validators/maxDateValidator';
import minDateValidator from '../shared/validators/minDateValidator';
export default {
  setup() {
    return { v$: vuelidate() }
  },
  components: { Alert },
  name: 'Reports',
  data() {
    return {
      log: {
        message: '',
        status: {
          error: false,
        }
      },
      rangeForm: {
        startDate: '',
        endDate: '',
      },
      operationsChart: null,
      reservationStatusChart: null,
      loanStatusChart: null,
      delayed: false,
      backgroundColors: ['#0061d871', '#ff000080', '#10c20079', '#ee9e267e'],
      borderColors: ['0063d8', '#ff0000', '10c200', '#ee9e26'],
    }
  },
  validations() {
    return {
      rangeForm: {
        startDate: {
          required,
          maxDateValidator: (value) => maxDateValidator(this.rangeForm.endDate)(value),
          $autoDirty: true,
        },
        endDate: {
          required,
          minDateValidator: (value) => minDateValidator(this.rangeForm.startDate)(value),
          maxDateValidator: maxDateValidator(),
          $autoDirty: true,
        },
      },
    }
  },
  computed: {
    rangeFormIsValid() {
      return !this.v$.rangeForm.$invalid;
    },
  },
  methods: {
    controlIsValid(attributeName) {
      return !this.v$.rangeForm[attributeName].$invalid && this.v$.rangeForm[attributeName].$dirty;
    },
    controlHasError(attributeName) {
      return this.v$.rangeForm[attributeName].$error;
    },
    getDateString(date = new Date()) {
      return date.toISOString().slice(0, 10);
    },
    alert(message, type) {
      this.log.message = message;
      Object.keys(this.log.status).forEach(key => this.log.status[key] = key == type);
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
                position: 'bottom',
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
    submit() {
      if (this.rangeFormIsValid) {
        this.operationsChart.destroy();
        this.reservationStatusChart.destroy();
        this.loanStatusChart.destroy();

        this.getReport(this.rangeForm.startDate, this.rangeForm.endDate);
      }
    },
    getReport(startDate, endDate) {
      ReportService.getReport(startDate, endDate).then(response => {

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

      }).catch(err => this.alert('Erro ao recuperar relatórios: ' + err, 'error'));
    },
  },
  mounted() {
    let sixMonthsBefore = new Date();
    sixMonthsBefore.setMonth(sixMonthsBefore.getMonth() - 5);

    this.rangeForm.startDate = this.getDateString(sixMonthsBefore);
    this.rangeForm.endDate = this.getDateString();

    this.getReport(this.rangeForm.startDate, this.rangeForm.endDate);
  },
}
</script>

<style scoped>
</style>