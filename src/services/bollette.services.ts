import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Bolletta } from '../model/bolletta.model';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable() // Mandatory for a Service that uses another Service
export class BolletteService {
	private bollette: Bolletta[] = [];
	private link: string = 'http://www.auronzovacanze.com/bollette/';

	constructor(private storage: Storage, private http: Http) {}
    
	addBolletta(bolletta: Bolletta) {
		bolletta.scadenza = this.parseISOString(bolletta.scadenza);
		bolletta.dataPagamento = this.parseISOString(bolletta.dataPagamento);
		this.bollette.push(bolletta);
		this.storage.set("bollette", this.bollette); // Update storage
		// this.uploadBollette();
	}
	
	payBolletta(index) {
		console.log(this.bollette[index]);
		let date = new Date().toISOString(); // From ISO to
		date = date.substring(0, date.indexOf("T")); // YYYY-MM-DD
		this.bollette[index].pagata = true;
		this.bollette[index].dataPagamento = this.parseISOString(date);
		return this.storage.set("bollette", this.bollette); // Update storage
		// this.uploadBollette();
	}

	deleteBolletta(index) {
		this.bollette.splice(index, 1);
		this.storage.set("bollette", this.bollette); // Update storage
		// this.uploadBollette();
	}

	getBollette() {
		return this.storage.get('bollette')
			.then((bollette) => {
					console.log("Storage");
					console.log(bollette);
					this.bollette = bollette == null ? [] : bollette; // If response is empty load an empty array
					return this.bollette.slice();
				}
			);
	}

	uploadBollette() {
		let bolletteJSON = JSON.stringify(this.bollette);
		this.http.post(this.link + "post.php", bolletteJSON)
			.subscribe(data => {
				// this.storage.set("bollette", this.bollette); // Update storage
				console.log("New data uploaded");
				console.log(data);
			}, error => {
				console.log(error);
			})
	}

	downloadBollette() {
		this.http.get(this.link + "get.php")
			.map(res => res.json())
			// .subscribe has three callback: success, failure, validate
			.subscribe(
				result => {
					console.log("Updated storage from downloaded data");
					this.storage.set("bollette", result);
				}, error => {
					console.log(error);
				}
			);
	}

	parseISOString(date: string) {
		let array = date.split("-");
		let day: string = array[2];
		let month: string = array[1];
		let year: string = array[0]
		switch (month) {
			case "01":
				month = "gennaio";
				break;
			case "02":
				month = "febbraio";
				break;
			case "03":
				month = "marzo";
				break;
			case "04":
				month = "aprile";
				break;
			case "05":
				month = "maggio";
				break;
			case "06":
				month = "giugno";
				break;
			case "07":
				month = "luglio";
				break;
			case "08":
				month = "agosto";
				break;
			case "09":
				month = "settembre";
				break;
			case "10":
				month = "ottobre";
				break;
			case "11":
				month = "novembre";
				break;
			case "12":
				month = "dicembre";
				break;
		}
		return day + " " + month + " " + year;
	}
}
