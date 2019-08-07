import { Component } from '@angular/core';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pdf-export';

  // img = 'data:image/png;base64,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';

  jsPdf() {
    let doc = new jsPDF("portrait", "mm", "a4");

    let imgData = this.getDataUrl();

    doc.text('text 1', 10, 10);
    doc.addImage(imgData, 'jpg', 10, 20);
    doc.save('jsPdfTest.pdf');
  }

  getDataUrl() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    // let image = new Image();
    // image.src = img;

    let img = document.getElementById('canvasReference');

    // canvas.width = img.width;
    // canvas.height = img.height;
    ctx.drawImage(img, 0, 0, 200, 150);

    return canvas.toDataURL();
  }
}

