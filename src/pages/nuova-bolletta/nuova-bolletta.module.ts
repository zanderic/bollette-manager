import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuovaBollettaPage } from './nuova-bolletta';

@NgModule({
	declarations: [
		NuovaBollettaPage,
	],
	imports: [
		IonicPageModule.forChild(NuovaBollettaPage),
	],
	entryComponents: [
		NuovaBollettaPage
	]
})
export class NuovaBollettaPageModule {}
