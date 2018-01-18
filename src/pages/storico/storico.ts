import { Component } from '@angular/core';
import { NavController, PopoverController, Events } from 'ionic-angular';
import { BolletteService } from '../../services/bollette.services';
import { Bolletta } from '../../model/bolletta.model';
import { PopoverPage } from '../popover/popover';

@Component({
	selector: 'page-storico',
	templateUrl: 'storico.html',
})
export class StoricoPage {
	bollette: Bolletta[] = [];
	bolletteToShow: Bolletta[] = [];
	show: string = "tutte";
	totale: number = 0;
	display: string = "0";
	displayLabel: string = "SCADENZA";

	constructor(public navCtrl: NavController, private bolletteSrvc: BolletteService, private popoverCtrl: PopoverController,
		private events: Events) {
			this.bolletteSrvc.getBollette()
				.then((bollette) => {
					this.bollette = bollette;
					this.divideBollette();
				})
			
			this.events.subscribe("display:changed", (number) => {
				this.display = number;
				console.log(this.display);
				this.displayToLabel();
				this.sortBollette(this.display);
			});
	}

	presentPopover(event) {
		let popover = this.popoverCtrl.create(PopoverPage, { display: this.display });
		popover.present({ ev: event });
	}

	segmentChanged(choice) {
		this.show = choice.value;
		this.divideBollette();
	}

	divideBollette() {
		this.bolletteToShow = [];
		this.bollette.forEach((item, index) => {
			item.id = index; // Update index of bollette
			if (this.show == "tutte") {
				this.bolletteToShow.push(item);
			} else if (item.utenza == this.show) {
				this.bolletteToShow.push(item);
			}
		});
		// console.log(this.bolletteToShow);
		this.calcolaTotale();
		this.sortBollette(this.display);
	}

	sortBollette(number: string) {
		switch (number) {
			case "0": // Scadenza crescente
				this.bolletteToShow.sort(function (a, b) {
					return (a.scadenza < b.scadenza) ? -1 : ((a.scadenza > b.scadenza) ? 1 : 0);
				});
				break;
			case "1": // Pagamento crescente
				this.bolletteToShow.sort(function (a, b) {
					if (!a.pagata && !b.pagata) {
						// console.log("entrambe non pagate");
						return 0;
					} else if (a.pagata && !b.pagata) {
						// console.log("b non pagata");
						return -1;
					} else if (!a.pagata && b.pagata) {
						// console.log("a non pagata");
						return 1;
					} else {
						return (a.dataPagamento > b.dataPagamento) ? -1 : ((a.dataPagamento < b.dataPagamento) ? 1 : 0);
					}
				});
				break;
			case "2": // Importo crescente
				this.bolletteToShow.sort(function (a, b) {
					return (a.importo > b.importo) ? -1 : ((a.importo < b.importo) ? 1 : 0);
				});
				break;
			case "3": // Importo decrescente
				this.bolletteToShow.sort(function (a, b) {
					return (a.importo < b.importo) ? -1 : ((a.importo > b.importo) ? 1 : 0);
				});
				break;
		}
	}
	
	calcolaTotale() {
		this.totale = 0;
		this.bolletteToShow.forEach(item => {
			this.totale = Number(this.totale) + Number(item.importo);
		});
		this.totale = Number(this.totale.toFixed(2));
	}

	displayToLabel() {
		switch (this.display) {
			case "0":
				this.displayLabel = "SCADENZA";
				break;
			case "1":
				this.displayLabel = "DATA PAGAMENTO";
				break;
			case "2":
				this.displayLabel = "IMPORTO";
				break;
			case "3":
				this.displayLabel = "IMPORTO";
				break;
		}
	}

	parseISOString(date: string) {
		let array = date.split("-");
		let day: string = array[2];
		let month: string = array[1];
		let year: string = array[0]
		switch (month) {
			case "01":
				month = "gennaio";
				break;
			case "02":
				month = "febbraio";
				break;
			case "03":
				month = "marzo";
				break;
			case "04":
				month = "aprile";
				break;
			case "05":
				month = "maggio";
				break;
			case "06":
				month = "giugno";
				break;
			case "07":
				month = "luglio";
				break;
			case "08":
				month = "agosto";
				break;
			case "09":
				month = "settembre";
				break;
			case "10":
				month = "ottobre";
				break;
			case "11":
				month = "novembre";
				break;
			case "12":
				month = "dicembre";
				break;
		}
		return day + " " + month + " " + year;
	}
}
