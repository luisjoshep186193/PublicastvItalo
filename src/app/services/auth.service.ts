import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Elemento } from '../interfaces/element.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // create new user
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=[API_KEY]
  // sigin user password
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]
  // api key = AIzaSyBcPkO9oiGpfYaBUgfg2vsKvDdJdFYUOko

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private key = 'AIzaSyBcPkO9oiGpfYaBUgfg2vsKvDdJdFYUOko';
  private userToken = '';

  constructor(private http: HttpClient) { 
    this.leertoken();
  }

  logout() {
    localStorage.removeItem('token');
    this.userToken = '';
  }
  login(user: Elemento) {
    const authData = {
      email : user.email,
      password : user.psw,
      returnSecureToken : true
    };
    return this.http.post(
      `${ this.url }/verifyPassword?key=${ this.key }`,
      authData
    ).pipe(
      map( resp => {
        console.log('entro en el map()');
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }
  nuevousuario(user: Elemento) {
    const authData = {
      email : user.email,
      password : user.psw,
      returnSecureToken : true
    };

    return this.http.post(
      `${ this.url }/signupNewUser?key=${ this.key }`,
      authData
    ).pipe(
      map( resp => {
        console.log('entro en el mep()');
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken( idToken: string) {
     this.userToken = idToken;
     localStorage.setItem('token', idToken);
  }
  leertoken() {
    if ( localStorage.getItem('token')) {
       this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }
  estaAutenticado(): boolean {
   return this.userToken.length > 2;
  }
}
