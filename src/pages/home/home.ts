import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { Bolletta } from '../../model/bolletta.model';
import { BolletteService } from '../../services/bollette.services';
import { NuovaBollettaPage } from '../nuova-bolletta/nuova-bolletta';
import { BollettaPage } from '../bolletta/bolletta';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	bollettaPage: any;
	bollette: Bolletta[] = [];
	pagate: Bolletta[] = [];
	daPagare: Bolletta[] = [];
	show: string = "tutte";
	filter: boolean = false;

	constructor(private navCtrl: NavController, private bolletteSrvc: BolletteService, private modalCtrl: ModalController,
		private toastCtrl: ToastController) {
		this.bollettaPage = BollettaPage;
	}

	ionViewWillEnter() {
		this.callStorage();
	}

	showBolletta(bolletta, index) {
		this.navCtrl.push(BollettaPage, { id: index, obj: bolletta });
	}

	nuovaBollettaModal() {
		let modal = this.modalCtrl.create(NuovaBollettaPage, this.bollette);
		modal.onDidDismiss(data => {
			this.callStorage();
		});
		modal.present();
	}

	segmentChanged(choice)  {
		this.show = choice.value;
		console.log(this.show);
		this.divideBollette();
	}
	
	divideBollette() {
		this.pagate = [];
		this.daPagare = [];
		this.bollette.forEach((item, index) => {
			item.id = index; // Update index of bollette
			if (this.show == "tutte") {
				if (item.pagata) {
					this.pagate.push(item);
				} else {
					this.daPagare.push(item);
				}
			} else {
				if (item.pagata && item.utenza == this.show) {
					this.pagate.push(item);
				}
				if (!item.pagata && item.utenza == this.show) {
					this.daPagare.push(item);
				}
			}
		});
		console.log(this.pagate);
		console.log(this.daPagare);
	}

	showFilter() {
		if (this.filter) {
			this.filter = false;
		} else {
			this.filter = true;
		}
	}

	uploadBollette() {
		this.bolletteSrvc.uploadBollette();
		this.toast("Bollette caricate sul server")
	}

	payBolletta(index) {
		this.bolletteSrvc.payBolletta(index);
	}

	deleteBolletta(index) {
		this.bolletteSrvc.deleteBolletta(index);
		this.callStorage();
	}

	aggiorna(refresher) {
		this.bolletteSrvc.getBollette().then((bollette) => {
			this.bollette = bollette;
			this.divideBollette();
			setTimeout(() => {
				refresher.complete();
				this.toast("Bollette aggiornate");
			}, 500);
		});
	}

	toast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 1500,
			position: "bottom"
		});
		toast.present();
	}

	callStorage() {
		this.bolletteSrvc.getBollette().then((bollette) => {
			this.bollette = bollette;
			this.divideBollette();
		});
	}
}
