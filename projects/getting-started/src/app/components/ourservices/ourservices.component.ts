import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-ourservices',
  templateUrl: './ourservices.component.html',
  styleUrls: ['./ourservices.component.scss']
})

export class OurServicesComponent implements OnInit,AfterViewInit {
  constructor(private _apiservice:ApiService,private router:Router) { }


  services:any;
  isLoaded=false;
  imgUrl:string='http://villaonline.co/wwwroot/Uploads/panal/';

  @ViewChild('carousel1')
  carousel!: ElementRef;
  @ViewChild('carousel2')
  carouselPatner!: ElementRef;
  @ViewChild('carousel3')
  carouselTamayoz!: ElementRef;

   ngAfterViewInit(): void {
    setInterval(() => {
      this.carousel.nativeElement.click();
      this.carouselPatner.nativeElement.click();
      this.carouselTamayoz.nativeElement.click();

    }, 5000)
  }

  ngOnInit(): void {
    this.getServices();
  }


getServices(){
  this._apiservice.get(`/services/app/ServicePanal/GetAll?tenantId=1`).subscribe(
    (res=>{
      this.isLoaded=true
      //@ts-ignore
      this.services=res['result']
    })
  )
}



getProject(){
  this.router.navigateByUrl("/projects")
}
}
