import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {API_URL} from "../constants";
import {Invoice} from "../invoice";
import {Observable} from "rxjs/Observable";
import {HttpProvider} from "./http";

/*
  Generated class for the InvoiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InvoiceProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello InvoiceProvider Provider');
  }

  public query(): Observable<Invoice[]> {
    return this.http.get(`${API_URL}/invoice`)
      .map(response => response.json()._embedded.invoice);
  }

  public queryByOwnerEmail(email): Observable<Invoice[]> {
    return this.http.get(`${API_URL}/invoice/search/findByOwnerEmailadres?email=${email}&projection=driver`)
      .map(response => response.json()._embedded.invoice);
  }

  public save(invoice: Invoice): Observable<Invoice> {
    invoice.owner = `owner/${invoice.owner}`;
    return this.http.post(`${API_URL}/invoice`, invoice)
      .map(response => response.json());
  }
}
