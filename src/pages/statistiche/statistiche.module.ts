import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatistichePage } from './statistiche';

@NgModule({
  declarations: [
    StatistichePage,
  ],
  imports: [
    IonicPageModule.forChild(StatistichePage),
  ],
})
export class StatistichePageModule {}
