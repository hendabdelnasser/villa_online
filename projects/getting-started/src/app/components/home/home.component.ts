import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'projects/getting-started/src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,AfterViewInit{

  constructor(private _apiservice:ApiService,private router:Router) { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: false,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  effect = 'scrollx';
  services:any;
  isLoaded=false;
  picturesLength = 0;
  imgUrl:string=`${environment.baseUrl}/wwwroot/Uploads/panal/`;
  //imgUrl:string=`${environment.baseUrl}/wwwroot/Uploads/panal/`;

   @ViewChild('carousel1')
  carousel!: ElementRef;
  @ViewChild('carousel2')
  carouselPatner!: ElementRef;
  @ViewChild('carousel3')
  carouselTamayoz!: ElementRef;

   ngAfterViewInit(): void {
    setInterval(() => {
      // this.carousel.nativeElement.click();
      // this.carouselPatner.nativeElement.click();
      // this.carouselTamayoz.nativeElement.click();

    }, 2000)
  }

  ngOnInit(): void {
    this.getParners();
    this.getBanners();
    this.getHowWork();
    this.getProfessional();
    this.getProfessionalPic();
  }
  profissional=[{data:'',professionalismPanalPics:[{url:''}]}]
  getProfessional(){
    this._apiservice.get(`/services/app/HomePanal/GetAllProfessionalismPanal?tenantId=1`).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.profissional =res['result']
        }
      })
    )
  }
  profissionalPic=[{data:'',professionalismPanalPics:[{url:''}]}]

  getProfessionalPic(){
    this._apiservice.get(`/services/app/HomePanal/GetAllProfessionalismPicPanal?tenantId=1`).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.profissionalPic =res['result']
        }
      })
    )
  }
howWork=[{url:'',title:'',data:''}]
getHowWork(){
  this._apiservice.get(`/services/app/HomePanal/GetAllHowWork?tenantId=1`).subscribe(
    (res=>{
      this.isLoaded=true
      //@ts-ignore
      if(res['success']){
      //@ts-ignore
        this.howWork =res['result']
      }
    })
  )
}
partners=[{url:''}]
lengthOfLoop:number=0;
numbers:any;
Arr=Array
getParners(){
  this._apiservice.get(`/services/app/HomePanal/GetAllOurpartner?tenantId=1`).subscribe(
    (res=>{
      //@ts-ignore
      this.partners=res['result']
      this.lengthOfLoop=Math.floor(this.partners.length /4)
      this.numbers = Array(this.lengthOfLoop).fill(0).map((x,i)=>i)
    })
  )
}
banners=[{url:''}]

getBanners(){
  this._apiservice.get(`/services/app/HomePanal/GetAllHomePanal?tenantId=1`).subscribe(
    (res=>{
      //@ts-ignore
      if(res['success']){
      //@ts-ignore
        this.banners =res['result']
      }
    })
  )
}
getProject(){
  this.router.navigateByUrl("/projects")
}
}

