import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule'ü ekleyin

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // HttpClientModule'ü buraya ekleyin
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: any[] = []; // Oyunları saklamak için dizi
  loading: boolean = true; // Yükleniyor durumu

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.apiService.getGames().subscribe(
      (data: any) => {
        this.games = data.data; // API'den gelen oyunları games dizisine ata
        this.loading = false; // Yükleniyor durumunu kapat
      },
      (error) => {
        console.error('API isteği başarısız:', error);
        this.loading = false; // Hata durumunda yükleniyor durumunu kapat
      }
    );
  }

  // Güvenli URL oluştur
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}