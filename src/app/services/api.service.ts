import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://slotslaunch.com/api/games'; // API endpoint
  private apiKey = 'ztZkBKlkIrbywe8gHTCCvV6vb2M1toitHBBXalbqYu5Tq5rqWS'; // API token'iniz
  private origin = 'casinoper845.com'; // Origin başlığı

  constructor(private http: HttpClient) {}

  // Oyunları getir
  getGames(): Observable<any> {
    // Query parametresi olarak token'ı ekleyin
    const params = new HttpParams().set('token', this.apiKey);

    // Headers olarak Origin başlığını ekleyin
    const headers = new HttpHeaders({
      'Origin': this.origin
    });

    // API isteğini gönderin
    return this.http.get(this.apiUrl, { params, headers });
  }
}