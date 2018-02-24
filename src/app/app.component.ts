import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';


import { HomePage } from '../pages/home/home';
import { BolletteService } from '../services/bollette.services';
import { StoricoPage } from '../pages/storico/storico';
import { StatistichePage } from '../pages/statistiche/statistiche';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	@ViewChild('content') navCtrl: NavController; // Notifiche

	rootPage: any = HomePage;
	pages: Array<{title: string, component: any, icon: string}>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
		private bolletteSrvc: BolletteService, private fcm: FCM) {
			this.bolletteSrvc.downloadBollette();
			this.initializeApp();

			// used for an example of ngFor and navigation
			this.pages = [
				{ title: 'Home', component: HomePage, icon: "home" },
				{ title: 'Archivio', component: StoricoPage, icon: "list" },
				{ title: 'Statistiche', component: StatistichePage, icon: "pie" }
			];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.backgroundColorByHexString("#388E3C");
			this.splashScreen.hide();

			if (this.platform.is('cordova')) {
				this.fcm.getToken().then(token => {
					// Your best bet is to here store the token on the user's profile on the
					// Firebase database, so that when you want to send notifications to this 
					// specific user you can do it from Cloud Functions.
					console.log(token);
				});
	
				this.fcm.onNotification().subscribe(data => {
					if (data.wasTapped) {
						// Notificati on was received on device tray and tapped by the user.
						console.log(JSON.stringify(data));
						// this.navCtrl.setRoot(BollettaPage, { id: index, obj: bolletta });
					} else {
						// Notification was received in foreground. Maybe the user needs to be notified.
						console.log(JSON.stringify(data));
						// this.navCtrl.push(BollettaPage, { id: index, obj: bolletta });
					}
				});   
			}

			this.platform.pause.subscribe(() => {
				this.bolletteSrvc.uploadBollette();
			});
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}
