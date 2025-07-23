import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Comments {
  constructor(private _httpClint : HttpClient) {}

  createComment(data : object) : Observable<any> {
    return this._httpClint.post(`${environment.baseUrl}comments` , data)
  }

  getPostComments (postId : string): Observable<any> {
    return this._httpClint.get(`${environment.baseUrl}${postId}/comments`)
  }
  
  updateComment(commentId : string , data : object ) : Observable<any>{
    return this._httpClint.put(`${environment.baseUrl}comments/${commentId}` , data)
  }

  deleteComment(commentId : string) : Observable<any> {
    return this._httpClint.delete(`${environment.baseUrl}comments/${commentId}`)
  }

}
