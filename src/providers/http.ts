import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Header} from "ionic-angular";

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpProvider {

  constructor(private http: Http) {
  }

  public get(url, headers: Headers = new Headers) {
    return this.http.get(url, {
      headers: HttpProvider.setHeaders(headers)
    });
  }

  public post(url, object: Object, headers: Headers = new Headers()) {
    return this.http.post(url, object, {
      headers: HttpProvider.setHeaders(headers)
    });
  }

  public static setHeaders(headers: Headers = new Headers): Headers {

    if (!headers.get('Authorization')) {
      const encoded = sessionStorage.getItem("auth") || btoa('rickrongen:aapje')
      headers.append('Authorization', `Basic ${encoded}`);

    }
    return headers;
  }
}



