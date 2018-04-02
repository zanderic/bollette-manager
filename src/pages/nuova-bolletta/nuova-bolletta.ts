import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { Bolletta } from '../../model/bolletta.model';
import { BolletteService } from '../../services/bollette.services';

@Component({
	selector: 'page-nuova-bolletta',
	templateUrl: 'nuova-bolletta.html',
})
export class NuovaBollettaPage {
	nuovaBolletta: Bolletta;
	utenza: string;
	importo: string;
	inizioFatturazione: string;
	fineFatturazione: string;
	scadenza: string;
	pagata: boolean = false;
	dataPagamento: string;

	constructor(private viewCtrl: ViewController, private bolletteSrvc: BolletteService, private toastCtrl: ToastController) {
		let date = new Date();
		this.dataPagamento = date.toISOString(); // From ISO format to
		this.dataPagamento = this.dataPagamento.substring(0, this.dataPagamento.indexOf("T")); // YYYY-MM-DD
	}

	addBolletta() {
		if (this.utenza && this.importo && this.scadenza && this.inizioFatturazione && this.fineFatturazione) {
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

			this.nuovaBolletta = {
				utenza: this.utenza,
				importo: parseFloat(this.importo).toFixed(2),
				inizioFatturazione: this.inizioFatturazione,
				fineFatturazione: this.fineFatturazione,
				scadenza: this.scadenza,
				pagata: this.pagata,
				dataPagamento: this.dataPagamento,
				icona: icona
			};
			this.bolletteSrvc.add(this.nuovaBolletta);
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
}
