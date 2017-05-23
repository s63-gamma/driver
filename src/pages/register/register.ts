import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [
    AuthProvider
  ]
})
export class RegisterPage {
  public account = {
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public auth: AuthProvider,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register(account) {
    this.auth.register(account.username, account.password, account.firstname, account.lastname)
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
