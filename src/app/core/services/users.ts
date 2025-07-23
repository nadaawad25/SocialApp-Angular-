import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Users {
  constructor(private _httpClient : HttpClient) {}

  signUp (data : object) : Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/users/signup`, data)
  }

  signIn (data : object) : Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/users/signin`, data)
  }

  changePassword (data : object) : Observable<any>{
    return this._httpClient.patch(`${environment.baseUrl}/users/change-password`, data)
  }

  uploadProfilePhoto (data : object) : Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}/users/upload-photo`, data)
  }

  getLoggedUserData () : Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/users/change-password`)
  }

}
