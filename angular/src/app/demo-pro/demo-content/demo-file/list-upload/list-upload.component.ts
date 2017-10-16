import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FileUploadService } from '../../../../service/file-upload.service';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  showFile = false;
  fileUploads: Observable<string[]>

  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    this.uploadService.getFiles().subscribe(result => { this.fileUploads = result; })
    this.uploadService.getObservable().subscribe(
      massege => {
        console.log(massege);
        if (massege.upload = 'ok') {
          this.uploadService.getFiles().subscribe(result => { this.fileUploads = result });
          console.log(this.fileUploads);
        }
      }
    );
  }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getFiles();
    }
  }

}
