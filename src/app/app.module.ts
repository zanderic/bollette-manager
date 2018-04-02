import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// AF2 Settings
export const firebaseConfig = {
	apiKey: "AIzaSyB7t2fa076D3tCDy3FspHkVzoBZ2PMIJso",
	authDomain: "bollettemanager.firebaseapp.com",
	databaseURL: "https://bollettemanager.firebaseio.com",
	projectId: "bollettemanager",
	storageBucket: "bollettemanager.appspot.com",
	messagingSenderId: "722770881831"
};

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BollettaPage } from '../pages/bolletta/bolletta'; 
import { NuovaBollettaPage } from '../pages/nuova-bolletta/nuova-bolletta';
import { StoricoPage } from '../pages/storico/storico';
import { PopoverPage } from '../pages/popover/popover';
import { StatistichePage } from '../pages/statistiche/statistiche';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BolletteService } from '../services/bollette.services';


@NgModule({
	declarations: [
		MyApp,
		HomePage,
		BollettaPage,
		NuovaBollettaPage,
		StoricoPage,
		PopoverPage,
		StatistichePage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireDatabaseModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		BollettaPage,
		NuovaBollettaPage,
		StoricoPage,
		PopoverPage,
		StatistichePage
	],
	providers: [
		StatusBar,
		SplashScreen,
		BolletteService,
		SocialSharing,
		Screenshot,
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {}
