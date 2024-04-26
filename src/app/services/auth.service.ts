import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, user);
  }

  logout(): void {
    // Implement logout logic here
  }
}
