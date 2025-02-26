import { Component , OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})

export class GameListComponent implements OnInit {
  games: any[] = []; // Oyunları saklamak için dizi
  loading: boolean = true; // Yükleniyor durumu

  constructor(private apiService: ApiService) {}

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

  // Oyunun URL'sini yeni sekmede aç
  openGameUrl(url: string): void {
    window.open(url, '_blank');
  }
}
