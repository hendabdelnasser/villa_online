import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'projects/getting-started/src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CurrentUserService } from '../../services/current-user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,AfterViewInit{

  project={name:'',phone: '', email: '', message: '',id:0,tenantId:0};
  supportChat = {id: 0, tenantId: 0, message: '', supportId: 0, createdByUser: '', createdByUserId:'', createdOn: ''};
  supportChatList = [];


  constructor(private _apiservice:ApiService,
              private router:Router,
              private message:NzMessageService,
              private currentUser: CurrentUserService) { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    navSpeed: 100,
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

    console.log("Current User : " +  this.currentUser.currentUser)
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


insertSupport(){
  this.isLoaded=false;
  let fetch={
    Name: this.project.name,
    Phone: this.project.phone,
    Email: this.project.email,
    Message: this.project.message,
    tenantId:1
  }
  this._apiservice.post(`/Support/InsertNewTicket`,fetch).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
        this.isLoaded=true;

          this.message.create('success','تم اضافة البيانات بنجاح')
          this.project={name: '',email:'',phone:'',message:'',id:0, tenantId: 0};


        } else{
          this.message.create('error','من فضلك حاول مرة اخري')
        }
      })
    )
  }
}

