import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Bolletta } from '../../model/bolletta.model';
import { BolletteService } from '../../services/bollette.services';

@Component({
	selector: 'page-bolletta',
	templateUrl: 'bolletta.html',
})
export class BollettaPage {
	bolletta: Bolletta;
	id: number;

	constructor(public navCtrl: NavController, public navParams: NavParams, private bolletteSrvc: BolletteService,
		private alertCtrl: AlertController) {
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
		this.bolletteSrvc.deleteBolletta(this.id)
			.then((promise) => {
				this.navCtrl.pop();
		});
	}

	showConfirm() {
		let confirm = this.alertCtrl.create({
			title: "Eliminare bolletta",
			message: "Confermi di voler cancellare la bolletta?",
			buttons: [
				{
					text: 'Indietro',
					handler: () => {
						console.log('Disagree clicked');
					}
				},
				{
					text: 'Conferma',
					handler: () => {
						console.log('Agree clicked');
						this.bolletteSrvc.deleteBolletta(this.id);
						this.navCtrl.pop();
					}
				}
			]
		});
		confirm.present();
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
}
