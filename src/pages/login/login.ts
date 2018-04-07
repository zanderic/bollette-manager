import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import { HomePage } from '../home/home';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	user: FormGroup;

	constructor(private navCtrl: NavController, private authSrvc: AuthService, private formBuilder: FormBuilder,
		private toastCtrl: ToastController, private menuCtrl: MenuController) {
		// Form validation
		this.user = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

	ionViewWillEnter() {
		this.menuCtrl.swipeEnable(false);
	}

	ionViewDidLeave() {
		this.menuCtrl.swipeEnable(true);
	}

	signin(email, pass) {
		console.log(this.user.value.email);
		console.log(this.user.value.password);
		this.authSrvc.signinWithCredentials(this.user.value.email, this.user.value.password).then(() => {
			this.navCtrl.setRoot(HomePage);
		}).catch(error => {
			console.log(error.code);
			console.log(error.message);
			this.presentToast(error.message);
		})
	}

	loginGoogle() {
		this.authSrvc.loginWithGoogle().then(() => {
			this.navCtrl.setRoot(HomePage);
		}).catch(error => {
			console.log(error.code);
			console.log(error.message);
			console.log(error.email); // The email of the user's account used.
			console.log(error.credential); // The firebase.auth.AuthCredential type that was used.
			this.presentToast(error.message);
		});
	}

	presentToast(text: string) {
		let toast = this.toastCtrl.create({
			message: text,
			duration: 4000,
			position: 'bottom'
		});
		toast.present();
	}
}
