import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BollettaPage } from '../pages/bolletta/bolletta'; 
import { NuovaBollettaPage } from '../pages/nuova-bolletta/nuova-bolletta';
import { StoricoPage } from '../pages/storico/storico';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BolletteService } from '../services/bollette.services';


@NgModule({
	declarations: [
		MyApp,
		HomePage,
		BollettaPage,
		NuovaBollettaPage,
		StoricoPage
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		BollettaPage,
		NuovaBollettaPage,
		StoricoPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		BolletteService
	]
})
export class AppModule {}
