import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { StoricoPage } from '../pages/storico/storico';
import { StatistichePage } from '../pages/statistiche/statistiche';
import { SettingsPage } from '../pages/settings/settings';
import { AuthService } from '../services/auth.services';
import { BolletteService } from '../services/bollette.services';
import { NotificationService } from '../services/notification.services';
import { ToastController } from 'ionic-angular';
// import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
import { SettingsService } from '../services/settings.services';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any;
	pages: Array<{ title: string, component: any, icon: string }>;
	email: string;
	userUID: string;
	selectedTheme: String;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authSrvc: AuthService,
		private bolletteSrvc: BolletteService, private notificationSrvc: NotificationService, private toastCtrl: ToastController,
		private settingsSrvc: SettingsService) {
		this.initializeApp();
		this.pages = [
			{ title: 'Home', component: HomePage, icon: "home" },
			{ title: 'Archivio', component: StoricoPage, icon: "list" },
			{ title: 'Statistiche', component: StatistichePage, icon: "pie" },
			{ title: 'Impostazioni', component: SettingsPage, icon: "settings" }
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.backgroundColorByHexString("#087e06");
			this.splashScreen.hide();
			this.settingsSrvc.getActiveTheme().subscribe(val => this.selectedTheme = val);
		});
		this.authRedirect();
	}

	// Login and logout redirect
	private authRedirect() {
		this.authSrvc.firebaseAuth.authState
			.subscribe(user => {
				if (user) {
					console.log(user.uid);
					this.userUID = user.uid;
					this.email = user.email;
					if (this.platform.is("cordova")) {
						this.activateNotification();
					}
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

	private activateNotification() {
		console.log(this.userUID);
		// Get a FCM token
		this.notificationSrvc.getToken(this.userUID, this.email);

		// Listen to incoming messages
		this.notificationSrvc.listenToNotifications().pipe(
			tap(msg => {
				console.log(msg);
				const toast = this.toastCtrl.create({
					message: msg.body,
					duration: 5000
				});
				toast.present();
			})
		).subscribe();
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
