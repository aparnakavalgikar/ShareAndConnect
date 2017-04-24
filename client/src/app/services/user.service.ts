/**
 * Created by makarandpuranik on 4/5/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class UserService {
  private authToken: any;
  private user: any;

  constructor(private http:Http){
    console.log("User Service is initialized...");
  }

  getUsers(){
    return this.http.get('http://localhost:3000/api/users').map(res => res.json());
  }

  addUser(user){
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/user', JSON.stringify(user), {headers: headers})
      .map(res => res.json());
  }

  updateUser(user){
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('http://localhost:3000/api/user'+user._id, JSON.stringify(user), {headers: headers})
      .map(res => res.json());
  }

  deleteUser(id){
    return this.http.delete('http://localhost:3000/api/user'+id)
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/users/authenticate',{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

