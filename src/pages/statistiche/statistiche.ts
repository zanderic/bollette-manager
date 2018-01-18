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
	@ViewChild('lineCanvas') lineCanvas;

	bollette: Bolletta[];
	quantitaBollette: Number[];
	sommaImportiBollette: Number[];
	barChart: any;
	pieChart: any;
	lineChart: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private bolletteSrvc: BolletteService) {
		console.log("costruttore");
		this.bolletteSrvc.getBollette().then((bollette => {
			this.bollette = bollette;
			
			this.quantitaBollette = this.countQuantita();
			this.createBarChart();
			this.sommaImportiBollette = this.countImporto();
			this.createPieChart();
			this.createLineChart();
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

	createLineChart() {
		this.lineChart = new Chart(this.lineCanvas.nativeElement, {
			type: 'line',
			data: {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [{
					label: "My First dataset",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: [65, 59, 80, 81, 56, 55, 40],
					spanGaps: false,
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
