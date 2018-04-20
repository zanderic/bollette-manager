import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
export const firebaseConfig = {
	apiKey: "AIzaSyB7t2fa076D3tCDy3FspHkVzoBZ2PMIJso",
	authDomain: "bollettemanager.firebaseapp.com",
	databaseURL: "https://bollettemanager.firebaseio.com",
	projectId: "bollettemanager",
	storageBucket: "bollettemanager.appspot.com",
	messagingSenderId: "722770881831"
};
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BollettaPage } from '../pages/bolletta/bolletta'; 
import { NuovaBollettaPage } from '../pages/nuova-bolletta/nuova-bolletta';
import { StoricoPage } from '../pages/storico/storico';
import { PopoverPage } from '../pages/popover/popover';
import { StatistichePage } from '../pages/statistiche/statistiche';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { BolletteService } from '../services/bollette.services';
import { AuthService } from '../services/auth.services';
import { NotificationService } from '../services/notification.services';
import { SettingsService } from '../services/settings.services';
import { SettingsPage } from '../pages/settings/settings';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		BollettaPage,
		NuovaBollettaPage,
		StoricoPage,
		PopoverPage,
		StatistichePage,
		LoginPage,
		SignupPage,
		SettingsPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFirestoreModule,
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		BollettaPage,
		NuovaBollettaPage,
		StoricoPage,
		PopoverPage,
		StatistichePage,
		LoginPage,
		SignupPage,
		SettingsPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		SocialSharing,
		Screenshot,
		Firebase,
		BolletteService,
		AuthService,
		NotificationService,
		SettingsService,
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {}
