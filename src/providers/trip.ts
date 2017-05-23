import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Trip} from "../trip";
import {API_URL} from "../constants";
import {HttpProvider} from "./http";
import {Invoice} from "../invoice";

/*
 Generated class for the TripProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class TripProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello TripProvider Provider');
  }

  public query(): Observable<Trip[]> {
    return this.http.get(`${API_URL}/trip?projection=driver`)
      .map(response => response.json()._embedded.trip);
  }
}
