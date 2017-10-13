import { Component, OnInit, Inject } from '@angular/core';
// , Input
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
// import { ThumbnailsModule } from 'angular-thumbnails';
// import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

import { MemberService } from '../service/member.service';

export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
// export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
export class ConfirmComponent implements ConfirmModel, OnInit {
  title: string;
  message: string;
  images:any[] = [
    {url:'assets/image/character_01.png'},
    {url:'assets/image/character_02.png'},
    {url:'assets/image/character_03.png'},
    {url:'assets/image/character_04.png'},
    {url:'assets/image/character_05.png'},
    {url:'assets/image/character_06.png'},
    {url:'assets/image/character_07.png'},
    {url:'assets/image/character_08.png'},
    {url:'assets/image/character_09.png'},
    {url:'assets/image/character_10.png'},
    {url:'assets/image/character_11.png'},
    {url:'assets/image/character_12.png'},
  ];

  ////////////////////////
  email: string = ""
  name: string = "";
  password: string = "";
  img: string = "";

  constructor(public dialogRef: MdDialogRef<ConfirmComponent>, private memberService:MemberService) { }

  ngOnInit() {
    this.img = localStorage.getItem('profile_img');
  }

  // updateImage(img: string): void{
  //
  //   var id = localStorage.getItem("email");
  //   this.memberService.updateImage(this.name, id, this.password, img).subscribe(result => {
  //     console.log("resulut = " + result);
  //   });
  //   }

  onClick(img):Promise<any> {
    // alert(img);
    return this.img = img;
  }

  onCloseSave(){
    console.log('modal image:::'+this.img);
    // this.updateImage(this.img);
    this.dialogRef.close(this.img);
    // this.dialogRef.close(this.imgClickExam());
  }

  onCloseCancel() {
    console.log('onCloseCancel:'+this.img);
    this.dialogRef.close('');
  }
}
