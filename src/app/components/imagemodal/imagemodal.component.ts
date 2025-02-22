import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // NgbActiveModal'ı içe aktarın

@Component({
  selector: 'app-announcement-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">ÖNEMLİ DUYURU</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <ul>
        <li>Casinoper, "Google Ücretli-Sponsorlu Reklam" KULLANMAZ. Yönlendirilen siteler SAHTEDİR ve DOLANDIRICIDIR.</li>
        <li>Güncel giriş adreslerimize sosyal medya hesaplarımızdan ulaşabilir, mobil uygulamamızı indirerek hızlı ve güvenli erişim sağlayabilirsiniz.</li>
        <li>"Hesabınız blocklandı, hesabınızın açılması için bir yatırım yapmanız gerekli" şeklinde site üzerinden hiçbir temsilcimizin üyelerden ekstra bakiye istemesi söz konusu olamaz.</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="activeModal.close('Close click')">Kapat</button>
    </div>
  `,
})
export class AnnouncementModalComponent {
  constructor(public activeModal: NgbActiveModal) {} // NgbActiveModal'ı enjekte edin
}