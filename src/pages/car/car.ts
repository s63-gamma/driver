import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Car} from "../../car";
import {CarProvider} from "../../providers/car";


@Component({
  selector: 'page-car',
  templateUrl: 'car.html',
  providers: [CarProvider]
})
export class CarPage implements OnInit {
  public cars: Car[] = [];

  constructor(public navCtrl: NavController,
              public carProvider: CarProvider) {
  }

  public ngOnInit() {
    this.carProvider.query().subscribe(cars => {
      this.cars.push(cars[0]);
      this.cars.push(cars[1]);
    })
  }

}
