import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private proxyUrl = '/api/proxy/games'; // Sunucu tarafındaki proxy endpoint'i

  constructor(private http: HttpClient) {}

  // Oyunları getir
  getGames(): Observable<any> {
    return this.http.get(this.proxyUrl); // Proxy endpoint'ine istek yap
  }
}