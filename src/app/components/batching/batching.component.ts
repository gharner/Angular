import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { SandboxService } from 'src/app/services/sandbox.service';

@Component({
  selector: 'app-batching',
  templateUrl: './batching.component.html',
  styleUrls: ['./batching.component.css'],
})
export class BatchingComponent {
  public products!: any[];

  constructor(private sandboxService: SandboxService) {}

  async ngOnInit() {
    await this.batchExample();
    console.log(this.products);
  }

  async batchExample() {
    const arrayOfProducts = await this.sandboxService.getProducts();

    const batches = [];

    while (arrayOfProducts.length) {
      // three batches
      const batch = arrayOfProducts.splice(0, 3);

      // add the batch request to to a queue
      batches.push(...batch);
    }

    // after all of the data is fetched, return it
    this.products = await Promise.all(batches);
  }

  async printPDF(): Promise<void> {
    try {
      const doc = new jsPDF();

      // Set initial font and header details.
      this.setPDFHeaders(doc);

      // Add standings details.
      this.addProductsPDF(doc);

      // Save the generated PDF.
      doc.save('products.pdf');
    } catch (error) {
      console.error('Error generating the PDF:', error);
    }
  }

  private setPDFHeaders(doc: jsPDF): void {
    doc.setFont('Helvetica', 'Oblique', 100);
    doc.setFontSize(32);
    doc.text('Product Table', 10, 10);
    doc.setFontSize(16);
  }

  private addProductsPDF(doc: jsPDF): void {
    let yPosition = 20;

    this.products.forEach((m) => {
      if (yPosition > 290) {
        doc.addPage();
        yPosition = 10;
      }

      doc.text(m.code, 10, yPosition);
      doc.text(m.name, 50, yPosition);
      doc.text(m.category, 95, yPosition);
      doc.text((m.quantity as number).toString(), 140, yPosition);

      yPosition += 6;
    });
  }
}
