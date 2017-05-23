import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TripProvider} from "../../providers/trip";
import {Observable} from "rxjs/Observable";
import {Trip} from "../../trip";
import {InvoiceProvider} from "../../providers/invoice";
import {Invoice} from "../../invoice";

/**
 * Generated class for the Route page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
  providers: [
    TripProvider,
  ]
})
export class RoutePage {
  public invoices: Invoice[];
  public trips: Trip[]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tripProvider: TripProvider) {
  }

  ionViewDidLoad() {
    this.invoices = this.navParams.get('invoices') || [];
    this.invoices
      .filter(invoice => invoice.trips = []);

    this.tripProvider.query().subscribe(trips => {
      this.trips = trips;
      this.invoices.forEach(invoice => {
        for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
          invoice.trips.push(this.trips[Math.floor(Math.random() * this.trips.length)])
        }
      });

      console.log(this.invoices);
    })


  }
}

