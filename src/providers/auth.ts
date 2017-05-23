import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {API_URL} from "../constants";

/*
 Generated class for the AuthProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthProvider {

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

  public login(username: String, password: String): Observable<number> {
    const encoded = btoa(`${username}:${password}`);

    const headers = new Headers();
    headers.append('Authorization', `Basic ${encoded}`);

    const observable = this.http.get(`${API_URL}`, {
      headers: headers
    })
      .map(response => response.status);

    observable.subscribe(response => {
      if (response == 200) {
        sessionStorage.setItem("auth", encoded)
      }
    });

    return observable
  }

  public register(username: String, password: String, firstname: String, lastname: String): Observable<any> {
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname
    };

    const headers = new Headers();

    const observable = this.http.post(`${API_URL}/createuser?username=${username}&password=${password}&firstname=${firstname}&lastname=${lastname}`, {})
      .map(response => response.status);

    observable.subscribe(response => {
        if (response == 200) {
          sessionStorage.setItem("auth", btoa(`${username}:${password}`))
        }
      });

    return observable
  }

}
