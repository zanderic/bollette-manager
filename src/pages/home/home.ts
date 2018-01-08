import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
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

	constructor(private navCtrl: NavController, private bolletteService: BolletteService, private modalCtrl: ModalController) {
		this.bollettaPage = BollettaPage;
		this.bolletteService.getBollette().then(
			(bollette) => {
				this.bollette = bollette
			}
		);
	}

	showBolletta(bolletta) {
		this.navCtrl.push(BollettaPage, bolletta);
	}

	aggiorna(refresher) {
		this.bolletteService.getBollette()
			.then(
				(bollette) => {
					this.bollette = bollette,
					setTimeout(() => {
						refresher.complete()
					// 	this.updatedCorsiToast();
					}, 500)
				}
			);
	}

	nuovaBolletta() {
		this.modalCtrl.create(NuovaBollettaPage, this.bollette).present();
	}
}
