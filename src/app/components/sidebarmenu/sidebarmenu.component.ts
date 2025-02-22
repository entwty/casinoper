import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebarmenu',
  standalone: true, // Angular 17+ için standalone bileşen
  imports: [CommonModule],
  templateUrl: './sidebarmenu.component.html',
  styleUrls: ['./sidebarmenu.component.scss']
})
export class SidebarComponent {
  @ViewChild('sidebarMenu') sidebarMenu!: ElementRef;

  @Input() isLoggedIn: boolean = false; // Kullanıcı giriş yapmış mı?
  @Input() username: string = ''; // Kullanıcı adı

  constructor(private offcanvasService: NgbOffcanvas) {}

  toggleSidebar() {
    const sidebar = this.sidebarMenu.nativeElement;
    if (sidebar.classList.contains('show')) {
      this.offcanvasService.dismiss(); // Sidebar'ı kapat
    } else {
      this.offcanvasService.open(sidebar); // Sidebar'ı aç
    }
  }
}