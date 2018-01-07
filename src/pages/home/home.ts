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
	public bollette: Bolletta[] = [];

	constructor(private navCtrl: NavController, private bolletteService: BolletteService, private modalCtrl: ModalController) {
		this.bolletteService.getBollette().then(
			(bollette) => {
				this.bollette = bollette
			}
		);
	}

	showBolletta(bolletta) {
		console.log(bolletta);
		this.modalCtrl.create(BollettaPage, bolletta).present();
	} 

	nuovaBolletta() {
		this.modalCtrl.create(NuovaBollettaPage, this.bollette).present();
	}
}
