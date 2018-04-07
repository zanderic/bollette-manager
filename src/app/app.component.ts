import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { StoricoPage } from '../pages/storico/storico';
import { StatistichePage } from '../pages/statistiche/statistiche';
import { AuthService } from '../services/auth.services';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	// @ViewChild('content') navCtrl: NavController; // Notifiche

	rootPage: any = LoginPage;
	pages: Array<{
		title: string,
		component: any,
		icon: string
	}>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authSrvc: AuthService) {
		this.initializeApp();
		this.isUserAuth();
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
			this.isUserAuth();
			if (this.platform.is('cordova')) {
				// Notifications
			}
		});
	}

	isUserAuth() {
		console.log(this.authSrvc.getUserId());
		if (this.authSrvc.getUserId()) {
			this.rootPage = HomePage;
		} else {
			this.rootPage = LoginPage;
		}
	}

	// Menu pages
	openPage(page) {
		// Reset the content nav to have just this page we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}

	logout() {
		this.authSrvc.logout().then(() => {
			console.log("Signout succesfull");
			this.nav.setRoot(LoginPage);
		}).catch(function (error) {
			console.log(error.code);
			console.log(error.message);
		})
	}
}
