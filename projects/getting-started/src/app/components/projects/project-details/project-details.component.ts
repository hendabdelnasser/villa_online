import { OnInit } from '@angular/core';
import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { phaseModel, projectModel, serviceModel } from '../../../services/models/projectModel';
import { regionModel } from '../../../services/models/regionModel';
import { UserModel } from '../../../services/models/userModel';

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailsComponent implements OnInit {
  thumbsSwiper: any;
  id: number = 0;
  region = new regionModel;
  constructors = new UserModel;
  projectDetails = new projectModel;
  projectPhase = new phaseModel;
  projectService = new serviceModel;

  constructor(private _apiService: ProjectService, private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getProjectById(this.id)
    this.getPhaseByProjectId(this.id)

  }
  private getProjectById(id: number) {
    this._apiService.get(`/services/app/Project/Get?Id=${id}`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.projectDetails = response['result'];
        // console.log(this.projectDetails);
        this.getRegionById(this.projectDetails.regionId)
        this.getConstructorById(this.projectDetails.userId)
      }
    }, console.error);
  }
  private getRegionById(Id: number = 1) {
    this._apiService.get(`/services/app/Region/Get?Id=${Id}`).subscribe(response => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.region = response['result'];
        // console.log(this.region);
      }
    }, console.error);
  }
  private getConstructorById(id: number = 1) {
    this._apiService.get(`/services/app/User/Get?Id=${id}`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.constructors = response['result'];
      }
    }, console.error);
  }
  private getPhaseByProjectId(id: number = 1) {
    this._apiService.get(`/services/app/Project/GetProjectPhaseCurrant?Id=${id}`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.projectPhase = response['result'];
      }
    }, console.error);
  }
}
