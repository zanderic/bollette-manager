import { Component } from '@angular/core';
import { NavParams, Events } from 'ionic-angular';

@Component({
	selector: 'page-popover',
	templateUrl: 'popover.html',
})
export class PopoverPage {
	display: string;

	constructor(private navParams: NavParams, private events: Events) {
		this.display = this.navParams.get("display");
	}

	sortBollette(number: number) {
		this.events.publish("display:changed", number);
	}
}
