import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsService {
	theme: BehaviorSubject<String>;

	constructor(private storage: Storage) {
		this.theme = new BehaviorSubject("default-theme");
		this.storage.get("theme").then((val) => {
			let storageTheme = (val == undefined) ? "default-theme" : val;
			this.theme.next(storageTheme);
		});
	}

	setActiveTheme(value) {
		this.storage.set("theme", value);
		this.theme.next(value);
	}

	getActiveTheme() {
		return this.theme.asObservable();
	}
}
