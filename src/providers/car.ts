import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {API_URL} from "../constants";
import {Car} from "../car";
import {HttpProvider} from "./http";

/*
  Generated class for the Car provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CarProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello Car Provider');
  }

  public query(): Observable<Car[]> {
    return this.http.get(`${API_URL}/car`)
      .map(response => response.json()._embedded.car);
  }

  public get(uuid): Observable<Car> {
    return this.http.get(`${API_URL}/car/${uuid}`)
      .map(response => response.json()._embedded.car);
  }
}
