import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
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
		// console.log(this.getCurrency(this.importo));
		this.nuovaBolletta = {
			utenza: this.utenza,
			importo: this.importo,
			scadenza: this.scadenza,
			pagata: this.pagata,
			dataPagamento: this.dataPagamento
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
