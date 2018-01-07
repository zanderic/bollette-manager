import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BollettaPage } from './bolletta';

@NgModule({
  declarations: [
    BollettaPage,
  ],
  imports: [
    IonicPageModule.forChild(BollettaPage),
  ],
})
export class BollettaPageModule {}
