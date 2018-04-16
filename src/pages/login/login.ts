import { Component } from '@angular/core';
import { NavController, ToastController, MenuController, LoadingController, Loading } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import { SignupPage } from '../signup/signup';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	user: FormGroup;
	loading: Loading;

	constructor(private navCtrl: NavController, private authSrvc: AuthService, private formBuilder: FormBuilder,
		private toastCtrl: ToastController, private menuCtrl: MenuController, private loadingCtrl: LoadingController) {
		this.user = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		})
	}

	ionViewWillEnter() {
		this.menuCtrl.swipeEnable(false);
	}

	ionViewDidLeave() {
		this.menuCtrl.swipeEnable(true);
	}

	login(email, pass) {
		this.presentLoading();
		this.authSrvc.signInWithEmail(this.user.value.email, this.user.value.password)
			.then(() => {
				this.loading.dismiss();
				console.log("Login successfull"); // this.navCtrl.setRoot(HomePage);
			}).catch(error => {
				this.loading.dismiss();
				console.log(error.code, error.message);
				this.presentToast(error.message);
			});
	}

	logInWithGoogle() {
		this.presentLoading();
		this.authSrvc.signInWithGoogle()	
			.then(() => {
				this.loading.dismiss();
				console.log("Login Google successfull"); // this.navCtrl.setRoot(HomePage);
			}).catch(error => {
				this.loading.dismiss();
				console.log(error.code, error.message);
				this.presentToast(error.message);
			});
	}

	signup() {
		this.navCtrl.push(SignupPage);
	}

	presentToast(text: string) {
		let toast = this.toastCtrl.create({
			message: text,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}

	presentLoading() {
		this.loading = this.loadingCtrl.create();
		this.loading.present(); // Will dismiss in ...
	}
}
