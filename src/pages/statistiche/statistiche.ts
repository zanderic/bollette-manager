import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Bolletta } from '../../model/bolletta.model';
import { BolletteService } from '../../services/bollette.services';

@Component({
	selector: 'page-statistiche',
	templateUrl: 'statistiche.html',
})
export class StatistichePage {

	@ViewChild('barCanvas') barCanvas;
	@ViewChild('pieCanvas') pieCanvas;
	@ViewChild('lineCanvasLuce') lineCanvasLuce;
	@ViewChild('lineCanvasAcqua') lineCanvasAcqua;
	@ViewChild('lineCanvasGas') lineCanvasGas;
	@ViewChild('lineCanvasInternet') lineCanvasInternet;
	@ViewChild('lineCanvasRifiuti') lineCanvasRifiuti;

	bollette: Bolletta[];
	quantitaBollette: Number[];
	sommaImportiBollette: Number[];
	barChart: any;
	pieChart: any;
	lineChartLuce: any;
	lineChartAcqua: any;
	lineChartGas: any;
	lineChartInternet: any;
	lineChartRifiuti: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private bolletteSrvc: BolletteService) {
		console.log("costruttore");
		this.bolletteSrvc.getBollette().then((bollette => {
			this.bollette = bollette;

			this.quantitaBollette = this.countQuantita();
			this.createBarChart();
			this.sommaImportiBollette = this.countImporto();
			this.createPieChart();
			this.createLineChart("Luce");
			this.createLineChart("Acqua");
			this.createLineChart("Gas");
			this.createLineChart("Internet");
			this.createLineChart("Rifiuti");
		}))
	}

	createBarChart() {
		this.barChart = new Chart(this.barCanvas.nativeElement, {
			type: 'bar',
			data: {
				labels: ["Luce", "Acqua", "Gas", "Internet", "Rifiuti"],
				datasets: [{
					label: 'Quantità',
					data: this.quantitaBollette,
					backgroundColor: [
						'rgba(255, 193, 7, 0.5)',
						'rgba(3, 155, 229, 0.5)',
						'rgba(244, 67, 54, 0.5)',
						'rgba(67, 160, 71, 0.5)',
						'rgba(117, 117, 117, 0.5)'
					],
					hoverBackgroundColor: [
						'rgba(255, 193, 7, 1)',
						'rgba(3, 155, 229, 1)',
						'rgba(244, 67, 54, 1)',
						'rgba(67, 160, 71, 1)',
						'rgba(117, 117, 117, 1)'
					],
					// borderColor: [
					// 	'rgba(255, 193, 7, 1)',
					// 	'rgba(3, 155, 229, 1)',
					// 	'rgba(244, 67, 54, 1)',
					// 	'rgba(67, 160, 71, 1)',
					// 	'rgba(117, 117, 117, 1)'
					// ],
					borderWidth: 1
				}]
			},
			options: {
				maintainAspectRatio: false,
				// title: {
				// 	text: "Torta buona",
				// 	display: true
				// },
				// layout: {
				// 	padding: 20
				// },
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							stepSize: 1
						}
					}]
				}
			}

		});
	}

	createPieChart() {
		this.pieChart = new Chart(this.pieCanvas.nativeElement, {
			type: 'pie',
			data: {
				labels: ["Luce", "Acqua", "Gas", "Internet", "Rifiuti"],
				datasets: [{
					label: "Spesa totale",
					data: this.sommaImportiBollette,
					backgroundColor: [
						'rgba(255, 193, 7, 0.6)',
						'rgba(3, 155, 229, 0.6)',
						'rgba(244, 67, 54, 0.6)',
						'rgba(67, 160, 71, 0.6)',
						'rgba(117, 117, 117, 0.6)'
					],
					hoverBackgroundColor: [
						'rgba(255, 193, 7, 1)',
						'rgba(3, 155, 229, 1)',
						'rgba(244, 67, 54, 1)',
						'rgba(67, 160, 71, 1)',
						'rgba(117, 117, 117, 1)'
					]
				}]
			},
			options: {
				maintainAspectRatio: false
			}
		});
	}

	createLineChart(utenza: string) {
		// Raccolta dati per l'utenza analizzata
		let scadenze: string[] = [];
		let importi: string[] = [];
		for (let i = 0; i < this.bollette.length; i++) {
			const bolletta = this.bollette[i];
			if (bolletta.utenza == utenza) {
				let scadenza = bolletta.scadenza.split("-");
				scadenze.push(scadenza[2] + "/" + scadenza[1] + "/" + scadenza[0]);
				importi.push(bolletta.importo);
			}
		}
		// Ancore agli elementi corretti del DOM
		let chart;
		let canvas;
		let lightColor;
		let fullColor;
		switch (utenza) {
			case "Luce":
				chart = this.lineChartLuce;
				canvas = this.lineCanvasLuce;
				lightColor = "rgba(255, 193, 7, 0.4)";
				fullColor = "rgba(255, 193, 7, 1)"
				break;
			case "Acqua":
				chart = this.lineChartAcqua;
				canvas = this.lineCanvasAcqua;
				lightColor = "rgba(3, 155, 229, 0.4)";
				fullColor = "rgba(3, 155, 229, 1)"
				break;
			case "Gas":
				chart = this.lineChartGas;
				canvas = this.lineCanvasGas;
				lightColor = "rgba(244, 67, 54, 0.4)";
				fullColor = "rgba(244, 67, 54, 1)"
				break;
			case "Internet":
				chart = this.lineChartInternet;
				canvas = this.lineCanvasInternet;
				lightColor = "rgba(67, 160, 71, 0.4)";
				fullColor = "rgba(67, 160, 71, 1)"
				break;
			case "Rifiuti":
				chart = this.lineChartRifiuti;
				canvas = this.lineCanvasRifiuti;
				lightColor = "rgba(117, 117, 117, 0.4)";
				fullColor = "rgba(117, 117, 117, 1)"
				break;
		}
		// Definizione del grafico
		chart = new Chart(canvas.nativeElement, {
			type: 'line',
			data: {
				labels: scadenze,
				datasets: [{
					label: utenza,
					data: importi,
					fill: false,
					lineTension: 0.1,
					backgroundColor: lightColor,
					borderColor: fullColor,
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: fullColor,
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: fullColor,
					pointHoverBorderColor: fullColor,
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					spanGaps: false
				}]
			},
			options: {
				maintainAspectRatio: false
			}
		});
	}

	countQuantita() {
		let luce: number = 0, acqua: number = 0, gas: number = 0, internet: number = 0, rifiuti: number = 0;
		this.bollette.forEach(element => {
			switch (element.utenza) {
				case "Luce":
					luce = luce + 1;
					break;
				case "Acqua":
					acqua = acqua + 1;
					break;
				case "Gas":
					gas = gas + 1;
					break;
				case "Internet":
					internet = internet + 1;
					break;
				case "Rifiuti":
					rifiuti = rifiuti + 1;
					break;
			}
		});
		console.log([luce, acqua, gas, internet, rifiuti]);
		return [luce, acqua, gas, internet, rifiuti];
	}

	countImporto() {
		let luce: number = 0, acqua: number = 0, gas: number = 0, internet: number = 0, rifiuti: number = 0;
		this.bollette.forEach(element => {
			switch (element.utenza) {
				case "Luce":
					luce = luce + Number(element.importo);
					break;
				case "Acqua":
					acqua = acqua + Number(element.importo);
					break;
				case "Gas":
					gas = gas + Number(element.importo);
					break;
				case "Internet":
					internet = internet + Number(element.importo);
					break;
				case "Rifiuti":
					rifiuti = rifiuti + Number(element.importo);
					break;
			}
		});
		console.log([luce, acqua, gas, internet, rifiuti]);
		return [luce, acqua, gas, internet, rifiuti];
	}
}
