import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    AuthProvider
  ]
})
export class LoginPage {

  public account = {
    username: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public auth: AuthProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public register(account) {
    this.auth.login(account.username, account.password)
      .subscribe(result => {
        if (result == 200) {
          let toast = this.toastCtrl.create({
            message: "Account registered",
            duration: 3000
          });
          toast.present();
          this.viewCtrl.dismiss();
        } else {
          let toast = this.toastCtrl.create({
            message: "Account registration failed",
            duration: 3000
          });
          toast.present();
        }
      })
  }

}
