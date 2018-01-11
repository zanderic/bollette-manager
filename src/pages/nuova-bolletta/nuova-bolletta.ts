import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { Bolletta } from '../../model/bolletta.model';
import { BolletteService } from '../../services/bollette.services';

@Component({
	selector: 'page-nuova-bolletta',
	templateUrl: 'nuova-bolletta.html',
})
export class NuovaBollettaPage {
	public utenza: string;
	public importo: number;
	public scadenza: string;
	public pagata: boolean = false;
	public dataPagamento: string;

	private bollette: Bolletta[] = [];
	private nuovaBolletta: Bolletta;

	constructor(public navParams: NavParams, private viewCtrl: ViewController,
		private bolletteSrvc: BolletteService, private toastCtrl: ToastController) {
		this.bollette = this.navParams.data;
		let date = new Date();
		this.dataPagamento = date.toISOString();
	}

	addBolletta() {
		if (this.utenza && this.importo && this.scadenza) {
			let icona: string;
			switch (this.utenza) {
				case "Luce":
					icona = "bulb";
					break;
				case "Acqua":
					icona = "water";
					break;
				case "Gas":
					icona = "bonfire";
					break;
				case "Internet":
					icona = "wifi";
					break;
				case "Rifiuti":
					icona = "trash";
					break;
			}

			// let precision = this.importo.toPrecision(2);
			this.nuovaBolletta = {
				id: 0, // This will change
				utenza: this.utenza,
				importo: this.importo,
				scadenza: this.parseISOString(this.scadenza),
				pagata: this.pagata,
				dataPagamento: this.parseISOString(this.dataPagamento),
				icona: icona
			};
			this.bolletteSrvc.addBolletta(this.nuovaBolletta);
			this.dismiss();	
		} else {
			this.completaCampi();
		}
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	completaCampi() {
		let toast = this.toastCtrl.create({
			message: "Inserisci i campi necessari per aggiungere la bolletta",
			duration: 2000,
			position: "bottom"
		});
		toast.present();
	}

	parseISOString(date: string) {
		// var b = s.split(/\D+/);
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
