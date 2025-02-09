import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'; // Firebase Cloud Firestore Database

@Injectable()
export class NotificationService {

	constructor(private firebaseNative: Firebase, private angularFirestore: AngularFirestore, private platform: Platform) {
    	console.log("NotificationService costruttore");
	}

	// Get permission from the user with the user UID and email
	async getToken(userUID: string, userEmail: string) {
		let token;
		if (this.platform.is('android')) {
			token = await this.firebaseNative.getToken()
		}
		if (this.platform.is('ios')) {
			token = await this.firebaseNative.getToken();
			await this.firebaseNative.grantPermission();
		}
		return this.saveTokenToFirestore(token, userUID, userEmail);
	}

	// Save the token to firestore
	private saveTokenToFirestore(token: string, userUID: string, userEmail: string) {
		if (!token) return;
		const devicesRef = this.angularFirestore.collection('devices');
		const docData = {
			token,
			userUID,
			userEmail
		}
		return devicesRef.doc(token).set(docData);
	}

	// Listen to incoming FCM messages
	listenToNotifications() {
		return this.firebaseNative.onNotificationOpen()
	}
}
