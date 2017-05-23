import {Component, OnInit} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {InvoiceProvider} from "../../providers/invoice";
import {USER} from "../../constants";
import {InvoicePage} from "../invoice/invoice";
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    InvoiceProvider,
    ModalController
  ]
})
export class HomePage implements OnInit {
  public invoices = [];
  public unPaidInvoices = [];
  public user = USER;

  constructor(public navCtrl: NavController,
              public invoiceProvider: InvoiceProvider,
              public modalCtrl: ModalController) {
  }

  public ngOnInit() {
    this.invoiceProvider.queryByOwnerEmail(USER.email).subscribe(invoices => {
      this.invoices = invoices;
      this.unPaidInvoices = invoices.filter(it => it.status === 0);
    })
  }

  public gotoCarTab() {
    this.navCtrl.push(InvoicePage)
  }

  public login() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  public register() {
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

}
