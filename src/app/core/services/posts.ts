import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Posts {

  constructor(private _httpClient : HttpClient) {}

  createPost (data : object) : Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}posts` , data)
  }

  getAllPosts() : Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}posts`)
  }

  getMyPosts () : Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}users/id/posts`)
  }

  getSinglePost (postId : string) : Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}posts/${postId}`)
  }
  updatePost ( data : object , postId : string) : Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}posts/${postId}`, data)
  }

  deletePost (postId : string) : Observable<any>{
    return this._httpClient.delete(`${environment.baseUrl}posts/${postId}`)
  }
  
}
