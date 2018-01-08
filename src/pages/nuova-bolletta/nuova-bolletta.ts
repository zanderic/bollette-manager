import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Bolletta } from '../../model/bolletta.model';
import { BolletteService } from '../../services/bollette.services';
import { HomePage } from '../home/home';

@Component({
	selector: 'page-nuova-bolletta',
	templateUrl: 'nuova-bolletta.html',
})
export class NuovaBollettaPage {
	public utenza: string;
	public importo: number;
	public scadenza: string;
	public pagata: boolean;
	public dataPagamento: string;

	private bollette: Bolletta[] = [];
	private nuovaBolletta: Bolletta;

	constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
		private bolletteService: BolletteService) {
		this.bollette = this.navParams.data;
		console.log(this.bollette);
	}

	addBolletta() {
		let icona: string;
		switch (this.utenza) {
			case "Luce":
				icona = "bulb";
				break;
			case "Acqua":
				icona = "water";
				break;
			case "Gas":
				icona = "flame";
				break;
			case "Internet":
				icona = "wifi";
				break;
			case "Rifiuti":
				icona = "trash";
				break;
		}

		this.nuovaBolletta = {
			utenza: this.utenza.trim(),
			importo: this.importo,
			scadenza: this.scadenza,
			pagata: this.pagata,
			dataPagamento: this.dataPagamento,
			icona: icona
		};
		this.bolletteService.updateBollette(this.nuovaBolletta);
		this.dismiss();
	}

	getCurrency(amount: number) {
		// return this.currencyPipe.transform(amount, 'EUR', true, '1.2-2');
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}
