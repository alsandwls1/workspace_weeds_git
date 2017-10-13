import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-notice',
  templateUrl: './demo-notice.component.html',
  styleUrls: ['./demo-notice.component.css']
})
export class DemoNoticeComponent implements OnInit {
  notices: any[] = [
    {id:1, title:'공지사항1', writer:'a', date:'17/10/13'},
    {id:2, title:'공지사항2', writer:'b', date:'17/10/13'},
    {id:3, title:'공지사항3', writer:'c', date:'17/10/13'},
    {id:4, title:'공지사항4', writer:'a', date:'17/10/13'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
