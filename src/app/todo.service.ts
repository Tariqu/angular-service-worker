import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${environment.baseURL}/users`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${environment.baseURL}/users/${userId}`);
  }

  getPostById(postId: number): Observable<any> {
    return this.http.get(`${environment.baseURL}/posts/${postId}`);
  }

  getPostsUserId(userId: number): Observable<any> {
    return this.http.get(`${environment.baseURL}/posts?userId=${userId}`);
  }

  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get(`${environment.baseURL}/comments?postId=${postId}`);
  }
}
