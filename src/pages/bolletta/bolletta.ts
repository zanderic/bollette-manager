import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bolletta } from '../../model/bolletta.model';
import { BolletteService } from '../../services/bollette.services';

@Component({
	selector: 'page-bolletta',
	templateUrl: 'bolletta.html',
})
export class BollettaPage {
	bolletta: Bolletta;
	id: number;

	constructor(public navCtrl: NavController, public navParams: NavParams, private bolletteSrvc: BolletteService) {
		this.bolletta = this.navParams.get("obj");
		this.id = this.navParams.get("id");
	}

	payBolletta() {
		this.bolletteSrvc.payBolletta(this.id)
			.then((promise) => {
				this.navCtrl.pop();
			});
	}

	deleteBolletta() {
		this.bolletteSrvc.deleteBolletta(this.id);
		this.navCtrl.pop();
	}

}
