import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
	private authState: Observable<firebase.User>;
	private currentUser: firebase.User = null;

	constructor(public firebaseAuth: AngularFireAuth) {
		this.authState = this.firebaseAuth.authState;
		this.authState.subscribe(user => {
			console.log("New UID");
			if (user) {
				this.currentUser = user;
				console.log(this.currentUser.uid);
			} else {
				this.currentUser = null;
				console.log(this.currentUser);
			}
		});
	}
	
	loginWithGoogle() {
		return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	}

	signinWithCredentials(email: string, password: string) {
		return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
	}

	getUserId() {
		return this.currentUser ? this.currentUser.uid : null;
	}

	logout() {
		return this.firebaseAuth.auth.signOut();
	}
}