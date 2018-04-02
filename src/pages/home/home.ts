import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { Bolletta } from '../../model/bolletta.model';
import { BolletteService } from '../../services/bollette.services';
import { NuovaBollettaPage } from '../nuova-bolletta/nuova-bolletta';
import { BollettaPage } from '../bolletta/bolletta';
import { Observable } from 'rxjs';
import moment from 'moment';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	bollettaPage: any;
	pagate: Bolletta[] = [];
	daPagare: Bolletta[] = [];
	bolletteFire: Observable<any[]>;
	totale: number = 0;
	today: string;
	// scadenzaText: string = "#666";

	constructor(private navCtrl: NavController, private bolletteSrvc: BolletteService, private modalCtrl: ModalController,
		private toastCtrl: ToastController) {
		this.bollettaPage = BollettaPage;
		this.today = new Date().toISOString();
		this.today = this.today.substring(0, this.today.indexOf("T")); // YYYY-MM-DD
		this.divideBollette();
	}

	ionViewWillEnter() {}

	showBolletta(bolletta: Bolletta) {
		this.navCtrl.push(BollettaPage, { obj: bolletta });
	}

	nuovaBollettaModal() {
		let modal = this.modalCtrl.create(NuovaBollettaPage);
		// modal.onDidDismiss(data => {
		// 	this.divideBollette();
		// });
		modal.present();
	}

	divideBollette() {
		this.bolletteSrvc.get().subscribe(bollette => {
			this.pagate = [];
			this.daPagare = [];
			console.log(bollette);
			for (let i = bollette.length - 1; i >= 0; i--) {
				if (bollette[i].pagata && this.pagate.length < 5) {
					this.pagate.push(bollette[i]);
				}
				if (!bollette[i].pagata) {
					this.daPagare.push(bollette[i]);
				}
			}
			this.calcolaTotale();
			console.log(this.daPagare);
			console.log(this.pagate);
		});
	}
	
	calcolaTotale() {
		this.totale = 0;
		this.daPagare.forEach(item => {
			this.totale = Number(this.totale) + Number(item.importo);
		});
		this.totale = Number(this.totale.toFixed(2));
	}

	payBolletta(index: string) {
		this.bolletteSrvc.pay(index);
	}

	deleteBolletta(index: string) {
		this.bolletteSrvc.delete(index);
	}

	oneWeekAlert(scadenza) {
		let split = scadenza.split("-");
		let dateToCompare = moment([split[0], split[1] - 1, split[2]]);
		let dateToday = moment(); // today
		if (dateToCompare.diff(dateToday, "days") < 7) {
			console.log(dateToCompare.diff(dateToday, "days"));
			console.log("meno di una settimana!");
			// this.scadenzaText = "danger";
		}
	}

	toast(msg: string) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 500,
			position: "bottom"
		});
		toast.present();
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

	// Empty function
	aggiorna(refresher: object) {
		// this.bolletteSrvc.getBollette().then((bollette) => {
		// 	this.bollette = bollette;
		// 	this.divideBollette();
		// 	setTimeout(() => {
		// 		refresher.complete();
		// 		this.toast("Bollette aggiornate");
		// 	}, 500);
		// });
	}
}

