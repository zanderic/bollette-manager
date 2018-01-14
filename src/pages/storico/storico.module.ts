import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoricoPage } from './storico';

@NgModule({
	declarations: [
		StoricoPage,
	],
	imports: [
		IonicPageModule.forChild(StoricoPage),
	],
})
export class StoricoPageModule {}
