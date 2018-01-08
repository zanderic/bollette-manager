import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';
import { Bolletta } from '../../model/bolletta.model';

// @IonicPage()
@Component({
	selector: 'page-bolletta',
	templateUrl: 'bolletta.html',
})
export class BollettaPage {
	public bolletta: Bolletta;

	constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
		this.bolletta = this.navParams.data;

	}

}
