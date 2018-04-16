import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController, Loading, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.services';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {
	newUser: FormGroup;
	loading: Loading;

	constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authSrvc: AuthService,
		private toastCtrl: ToastController, private menuCtrl: MenuController, private loadingCtrl: LoadingController) {
		this.newUser = this.formBuilder.group({
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

	signup(email, pass) {
		this.presentLoading();
		this.authSrvc.signUp(this.newUser.value.email, this.newUser.value.password).then(() => {
			this.loading.dismiss();
			console.log("Signup successfull"); // this.navCtrl.setRoot(HomePage);
		}).catch(error => {
			this.loading.dismiss();
			console.log(error.code, error.message);
			this.presentToast(error.message);
		})
	}

	presentToast(text: string) {
		let toast = this.toastCtrl.create({
			message: text,
			duration: 4000,
			position: 'bottom'
		});
		toast.present();
	}

	presentLoading() {
		this.loading = this.loadingCtrl.create();
		this.loading.present();
	}
}
