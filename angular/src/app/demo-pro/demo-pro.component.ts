import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service'

@Component({
  selector: 'app-demo-pro',
  templateUrl: './demo-pro.component.html',
  styleUrls: ['./demo-pro.component.css']
})
export class DemoProComponent implements OnInit {
  item:string = 'a';

  p_name:string;
  p_domain:string;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjectInfo();
  }

  getProjectInfo() {
    this.projectService.goToDetail(this.item).subscribe(result => {
      this.p_name = result.p_name;
      this.p_domain = result.p_domain;
    });
  }
}
