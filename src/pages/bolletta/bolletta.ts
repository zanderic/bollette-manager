import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Bolletta } from '../../model/bolletta.model';
import { BolletteService } from '../../services/bollette.services';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';

@Component({
	selector: 'page-bolletta',
	templateUrl: 'bolletta.html',
})
export class BollettaPage {
	bolletta: Bolletta;
	id: number;
	whatsappEnabled: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, private bolletteSrvc: BolletteService,
		private alertCtrl: AlertController, private socialSharing: SocialSharing, private screenshot: Screenshot) {
			this.bolletta = this.navParams.get("obj");
			this.id = this.navParams.get("id");
			this.checkWhatsapp();
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

	checkWhatsapp() {
		// Check if sharing is supported
		this.socialSharing.canShareVia('com.whatsapp').then(() => {
			this.whatsappEnabled = true;
		}).catch(() => {
			this.whatsappEnabled = false;
		});
	}

	shareViaWhatsapp() {
		if (this.whatsappEnabled) {
			// Take screenshot
			this.screenshot.URI(60).then((screen) => {
				// Share via whatsapp
				this.socialSharing.shareViaWhatsApp(null, screen.URI, null).then(() => {
					console.log("YEP!");
				}).catch(() => {
					console.log("error");
				});
			}).catch(() => {
				console.log("error in screenshot");
			})
		}
	}

	showConfirm(type: string) {
		// Defining message
		let t, m;
		switch (type) {
			case 'pay':
				t = 'Pagare bolletta';
				m = 'Confermi di aver pagato la bolletta?';
				break;
			case 'delete':
				t = 'Eliminare bolletta';
				m = 'Confermi di voler cancellare la bolletta?';
				break;
		}
		
		// Defining pupup
		let confirm = this.alertCtrl.create({
			title: t,
			message: m,
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
						if (type == 'pay') {
							this.payBolletta();
						} else {
							this.deleteBolletta();
						}
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
