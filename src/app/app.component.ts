import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { StoricoPage } from '../pages/storico/storico';
import { StatistichePage } from '../pages/statistiche/statistiche';
import { AuthService } from '../services/auth.services';
import { BolletteService } from '../services/bollette.services';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any;
	pages: Array<{ title: string, component: any, icon: string }>;
	email: string;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authSrvc: AuthService,
		private bolletteSrvc: BolletteService) {
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
			this.statusBar.backgroundColorByHexString("#087e06");
			this.splashScreen.hide();
		});
		this.authRedirect();
	}

	// Login and logout redirect
	private authRedirect() {
		this.authSrvc.firebaseAuth.authState
			.subscribe(user => {
				if (user) {
					console.log(user.uid);
					this.email = user.email;
					this.bolletteSrvc.changeRefBollette(user.uid);
					this.rootPage = HomePage;
				} else {
					console.log(null);
					this.email = null;
					this.rootPage = LoginPage;
				}
			}, (error) => {
				this.email = null;
				this.rootPage = LoginPage;
			}
		);
	}

	// Menu pages
	openPage(page) {
		// Reset the content nav to have just this page we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}

	logout() {
		this.authSrvc.signOut().then(() => {
			console.log("Signout successfull"); // this.nav.setRoot(LoginPage);
		}).catch(function(error) {
			console.log(error.code, error.message);
		})
	}
}
