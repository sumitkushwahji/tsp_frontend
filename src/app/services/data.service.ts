import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:8082/items';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createItem(item: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, item);
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadExcel(file: File): Observable<any[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any[]>(`${this.baseUrl}/upload`, formData);
  }
}
