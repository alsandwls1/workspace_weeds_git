import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { FileUploadService } from '../../../../service/file-upload.service';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  cnt = 1;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0)

    console.log(this.currentFileUpload.name);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);

    this.selectedFiles = undefined;
  }
}
