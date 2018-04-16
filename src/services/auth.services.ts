import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { AuthProvider } from '@firebase/auth-types';

@Injectable()
export class AuthService {
	private authState: Observable<firebase.User>;
	private currentUser: firebase.User;

	constructor(public firebaseAuth: AngularFireAuth, private platform: Platform) {
		// Maybe useless
		this.authState = this.firebaseAuth.authState;
		this.authState.subscribe(user => {
			if (user) {
				this.currentUser = user;
			} else {
				this.currentUser = null;
			}
		});
	}
	
	signInWithGoogle(): Promise<void> {
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	private oauthSignIn(provider: AuthProvider): Promise<void> {
		if (!this.platform.is("cordova")) {
			return this.firebaseAuth.auth.signInWithPopup(provider);
		} else {
			return this.firebaseAuth.auth.signInWithRedirect(provider)
				.then(() => {
					return this.firebaseAuth.auth.getRedirectResult().then(result => {
						console.log(result.credential.accessToken, result.user);
					}).catch(function (error) {
						console.log(error.message);
					});
				});
		}
	}

	signInWithEmail(email: string, password: string): Promise<void> {
		return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
	}

	signUp(email: string, password: string): Promise<void> {
		return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
	}
	
	signOut(): Promise<void> {
		return this.firebaseAuth.auth.signOut();
	}

	getUserId(): string {
		return this.currentUser ? this.currentUser.uid : null;
	}
}