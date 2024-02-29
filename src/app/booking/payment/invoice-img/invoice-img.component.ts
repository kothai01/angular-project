import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Booking } from '../../../shared/booking';
import { ScrollService } from '../../../scroll.service';
import { DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'invoice-img',
  templateUrl: './invoice-img.component.html',
  styleUrls: ['./invoice-img.component.css'],
})
export class InvoiceImgComponent {
  @Input() bookingDetails!: Booking;
  @Input() toPrint!: boolean;
  @Input() bookingId!: number;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  // Current date
  today = new Date();
  formatToday = this.datePipe.transform(this.today, 'dd-MM-yyyy');

  constructor(
    private scrollService: ScrollService,
    private datePipe: DatePipe
  ) {}

  // Scroll to a specified section
  scrollTo(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }

  // Generate and download the PDF
  generateAndDownloadPDF() {
    const pdfDefinition: any = {
      info: {
        title: 'Casa de Armas Reserve',
      },
      content: [
        {
          text: 'Casa de Armas rental summary',
          style: 'header',
        },
        {
          text: `Date of purchase: ${this.formatToday}`,
          style: 'span',
        },
        {
          text: `#00000${this.bookingId}`,
          style: 'span',
        },
        {
          text: `Name: ${this.bookingDetails.name}`,
          style: 'details',
        },
        {
          text: `Email: ${this.bookingDetails.email}`,
          style: 'details',
        },
        {
          text: `Phone:${this.bookingDetails.phone}`,
          style: 'details',
        },
        {
          text: `Number of guests:${this.bookingDetails.guests}`,
          style: 'details',
        },
        {
          text: `Entry date: ${this.bookingDetails.dateIn}`,
          style: 'details',
        },
        {
          text: `Departure date: ${this.bookingDetails.dateOut}`,
          style: 'details',
        },
        {
          text: 'Total',
          style: 'price',
        },
        {
          text: `${this.bookingDetails.price}€`,
          style: 'price',
        },
      ],
      styles: {
        header: {
          fontWeight: 'bold',
          letterSpacing: 2,
          fontSize: 18,
          margin: [0, 0, 0, 5],
        },
        span: {
          fontSize: 10,
          margin: [0, 0, 0, 5],
        },
        details: {
          fontSize: 12,
          letterSpacing: 0.5,
          margin: [0, 0, 0, 20],
        },
        price: {
          fontSize: 16,
          letterSpacing: 0.5,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
      },
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
    pdfMake.createPdf(pdfDefinition).download('Booking-CasaDeArmas.pdf');
  }
}
