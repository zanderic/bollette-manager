import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Bolletta } from '../model/bolletta.model';
import { HomePage } from '../pages/home/home';

@Injectable() // Mandatory for a Service that uses another Service
export class BolletteService {
	private bollette: Bolletta[] = [];

    constructor(private storage: Storage) {}
    
    updateBollette(bolletta: Bolletta) {
		console.log(bolletta);
        this.bollette.push(bolletta);
        this.storage.set("bollette", this.bollette);
    }

	getBollette() {
		return this.storage.get('bollette')
			.then(
				(bollette) => {
					console.log("Storage");
					console.log(bollette);
					this.bollette = bollette == null ? [] : bollette; // If response is empty load an empty array
					return this.bollette.slice();
				}
			);
	}
}
