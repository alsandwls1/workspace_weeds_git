import { Component, OnInit, ElementRef, Renderer, DoCheck, Output, EventEmitter } from '@angular/core';
// import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from '../confirm/confirm.component';
import { MdDialog } from '@angular/material';

import { MemberService } from '../service/member.service';
import { Member } from '../model/member.model';

export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements ConfirmModel, OnInit, DoCheck {
  login: boolean = false;
  isShow = true;
  isShow2 = true;
  isShow3 = true;

  title: string;
  message: string;
  dialogResult = "";

  member: Member;
  errorMessage: string;

  /////////////////////////////////////
  img1: string = "";
  email: string = ""
  name: string = "";
  password: string = "";

  constructor(public dialog: MdDialog, private memberService: MemberService) {
  }

  removeMember() {
    var id = localStorage.getItem("email");
    this.memberService.removeMember(id).subscribe(result => {
      console.log(result);
    });
  }

  updateName(name: string): void {
    this.isShow = true;

    var id = localStorage.getItem("email");
    // this.memberService.updateName(name,id,this.password).then(res => {
    this.memberService.updateName(name, id, this.password, this.img1).then(res => {
      var result = JSON.parse(res.text());
      this.email = result.email;
      this.name = result.name;
      this.password = result.password;
      this.img1 = result.profile_img;
    });
  }

  updatePassword(pw: string): void {
    this.isShow2 = true;

    var id = localStorage.getItem("email");
    // this.memberService.updatePassword(this.name,id,pw).subscribe(result => {
    this.memberService.updatePassword(this.name, id, pw, this.img1).subscribe(result => {
      console.log("updatePassword(*) resulut = " + result.email);
      console.log("updatePassword(*) resulut = " + result.password);
      this.email = result.email;
      this.name = result.name;
      this.password = result.password;
      this.img1 = result.profile_img;
    });
  }

  ngOnInit() {
    console.log('ProfileComponent # ngOnInit() working');
    this.getInfo();
  }

  ngDoCheck() {
    // console.log(this.isShow);
  }

  getInfo() {
    var id = localStorage.getItem("email");
    console.log('currentId=' + id);
    this.memberService.getInfo(id).subscribe(result => {
      this.email = result.email;
      this.name = result.name;
      this.password = result.password;
      this.img1 = result.profile_img;

      // console.log("img =" + result.profile_img);
      // console.log("getInfo =" + result);
    });
  }

  updateImg(img: string): void {
    var id = localStorage.getItem("email");

    // this.memberService.updateName(name,id,this.password).then(res => {
    this.memberService.updateImg(this.name, id, this.password, img).subscribe(result => {
      this.email = result.email;
      this.name = result.name;
      this.password = result.password;
      this.img1 = result.profile_img;
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      width: "600px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog save: ${result}`);
      if (result) {
        var id = localStorage.getItem("email");
        console.log(result.email)
        console.log(result);
        this.updateImg(result);

      } else {
        this.img1 = this.img1;
      }
    });
  }
  // openDialog() {
  //   let dialogRef = this.dialog.open(ConfirmComponent, {
  //     width: "600px"
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog save: ${result}`);
  //     if (result) {
  //       this.img = result;
  //     } else {
  //       this.img = this.img;
  //     }
  //   });
  // }
}
