import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BolletteService } from '../../services/bollette.services';
import { Bolletta } from '../../model/bolletta.model';
import { BollettaPage } from '../bolletta/bolletta';

@Component({
	selector: 'page-storico',
	templateUrl: 'storico.html',
})
export class StoricoPage {
	bollette: Bolletta[] = [];
	bolletteToShow: Bolletta[] = [];
	show: string = "tutte";
	filter: boolean = true;
	totale: number = 0;

	constructor(public navCtrl: NavController, public navParams: NavParams, private bolletteSrvc: BolletteService) {
		this.bolletteSrvc.getBollette()
			.then((bollette) => {
				this.bollette = bollette;
				this.divideBollette();
			})
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StoricoPage');
	}

	showBolletta(bolletta, index) {
		this.navCtrl.push(BollettaPage, { id: index, obj: bolletta });
	}

	divideBollette() {
		this.bolletteToShow = [];
		this.bollette.forEach((item, index) => {
			item.id = index; // Update index of bollette
			if (this.show == "tutte") {
				this.bolletteToShow.push(item);
			} else {
				if (item.utenza == this.show) {
					this.bolletteToShow.push(item);
				}
			}
		});
		console.log(this.bolletteToShow);
		this.calcolaTotale();
	}
	
	calcolaTotale() {
		this.totale = 0;
		this.bolletteToShow.forEach(item => {
			this.totale = Number(this.totale) + Number(item.importo);
		});
	}

	segmentChanged(choice) {
		this.show = choice.value;
		this.divideBollette();
	}

	showFilter() {
		if (this.filter) {
			this.filter = false;
		} else {
			this.filter = true;
		}
	}

	parseToISO(date: string) {
		let array = date.split(" ");
		let month = array[1];
		switch (month) {
			case "gennaio":
				month = "01";
				break;
			case "febbraio":
				month = "02";
				break;
			case "marzo":
				month = "03";
				break;
			case "aprile":
				month = "04";
				break;
			case "maggio":
				month = "05";
				break;
			case "giugno":
				month = "06";
				break;
			case "luglio":
				month = "07";
				break;
			case "agosto":
				month = "08";
				break;
			case "settembre":
				month = "09";
				break;
			case "ottobre":
				month = "010";
				break;
			case "novembre":
				month= "11";
				break;
			case "dicembre":
				month = "12";	
				break;
		}
		return array[0] + "/" + month + "/" + array[2];
	}
}
