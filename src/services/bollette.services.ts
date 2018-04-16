import { Injectable } from '@angular/core';
import { Bolletta } from '../model/bolletta.model';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable() // Mandatory for a Service that uses another Service
export class BolletteService {
	private bollette: Observable<Bolletta[]>
	private bolletteRef: AngularFireList<Bolletta>;
	private userUID: string;

	constructor(private firebaseDatabase: AngularFireDatabase) {
		console.log("Constructor bolletteService");
	}
	
	changeRefBollette(userUID: string) {
		this.userUID = userUID;
		console.log(this.userUID);
		this.bolletteRef = this.firebaseDatabase.list<Bolletta>(`bollette/${this.userUID}`, ref => ref.orderByChild("scadenza"));
		// Use snapshotChanges().map() to store the key
		this.bollette = this.bolletteRef.snapshotChanges()
			.map(
				changes => {
					return changes.map(c => ({
						key: c.payload.key, ...c.payload.val()
					}));
				}
			);
	}

	get(): Observable<Bolletta[]> {
		return this.bollette;
	}

	add(newBolletta: Bolletta) {
		this.bolletteRef.push(newBolletta);
	}

	delete(key: string) {
		this.bolletteRef.remove(key);
	}

	getById(bollettaID: string) {
		console.log(bollettaID);
		return this.firebaseDatabase.object(`/bollette/${this.userUID}/` + bollettaID);
	}
	pay(key: string) {
		let date = new Date().toISOString(); // From ISO to
		date = date.substring(0, date.indexOf("T")); // YYYY-MM-DD
		
		let bollettaToPay = this.getById(key);
		bollettaToPay.update({ pagata: true, dataPagamento: date });
	}
}