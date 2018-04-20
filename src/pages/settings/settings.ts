import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.services';

@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {
	selectedTheme: String;

	constructor(private settingsSrvc: SettingsService) {
		this.settingsSrvc.getActiveTheme().subscribe(val => this.selectedTheme = val);
	}

	chooseAppTheme() {
		this.settingsSrvc.setActiveTheme(this.selectedTheme);
	}
}
