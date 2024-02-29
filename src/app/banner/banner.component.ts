import { Component, Input } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @Input() localBooking! : boolean;

  constructor(private scrollService: ScrollService) {}

  scrollTo(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }

  openLinkInNewTab() {
    const url = 'https://www.airbnb.co.in/puebla-de-sanabria-spain/stays?locale=en&_set_bev_on_new_domain=1708927897_YjgwZGJjNTNkODg3';
    window.open(url, '_blank');
  }
}
