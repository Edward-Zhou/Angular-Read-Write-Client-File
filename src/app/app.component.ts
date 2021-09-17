import { Component, ElementRef, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  saveFileWithLink() {
    var data = {
      test: 'Hello World',
    };
    var json = JSON.stringify(data);
    var blob = new Blob([json], { type: 'application/json' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'test.json';
    a.click();
  }
  saveFileWithFileSaver() {
    var data = {
      test: 'Hello World',
    };
    var json = JSON.stringify(data);
    var file = new File([json], 'test.json', {
      type: 'application/json;charset=utf-8',
    });
    saveAs(file);
  }
  upload(event): void {
    console.log(event.target.files[0].name);
  }
  uploadDynamic() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      console.log(file.name);
    };
    fileUpload.click();
  }
  readFile(file: File) {
    var reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
    };
    reader.readAsText(file);
  }
}
