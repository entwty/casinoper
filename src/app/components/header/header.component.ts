import { Component, HostListener, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebarmenu/sidebarmenu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true, // Angular 17+ için standalone bileşen
  imports: [CommonModule], // SidebarComponent'i import et
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = false;
  isLoggedIn = false; // Kullanıcı giriş yapmış mı
  username = 'mirssc'; // Kullanıcı adı (Örnek)
  balance = 0.00; // Kullanıcı bakiyesi (Örnek)

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Sayfa kaydırıldığında siyah olacak
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.toggleSidebar(); // Sidebar'ı aç/kapa
    }
  }
}