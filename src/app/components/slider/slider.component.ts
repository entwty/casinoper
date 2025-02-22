import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  imports: [NgbModule , CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  slides = [
    { 
      image: 'https://percas.s3.eu-west-2.amazonaws.com/cpp/desktop/cper-15anlikkayip.jpg',
      button1: 'Hemen Oyna',
      button2: 'Detaylar'
    },
    { 
      image: 'https://percas.s3.eu-west-2.amazonaws.com/cpp/cp-pragmatic-sweet-baklava/cp-pragmatic-sweet-baklava-desktop.jpg',
      button1: 'Hemen Oyna',
      button2: 'Detaylar'
    },
    { 
      image: 'https://percas.s3.eu-west-2.amazonaws.com/cpp/fdb/cper+fdb+with+fs/cper-d-1000_100sweet.jpg',
      button1: 'Hemen Oyna',
      button2: 'Detaylar'
    },
    { 
      image: 'https://percas.s3.eu-west-2.amazonaws.com/cpp/cp-pragmatic-aztec-games-megaways/cp-pragmatic-aztec-gems-megaways-desktop.jpg',
      button1: 'Hemen Oyna',
      button2: 'Detaylar'
    },
  ];
}
