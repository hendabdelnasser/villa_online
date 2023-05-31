import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../../services/api.service';
import { ContactModel } from '../../services/models/contactModel';
import { environment } from 'projects/getting-started/src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private _apiService:ApiService,private message:NzMessageService,private fb:FormBuilder) { }
  contact=new ContactModel;
  buttonLoaded:boolean=false;
  ngOnInit(): void {
    this.getContactImg()
    this.form = this.fb.group({
      Name:[""],
      Mail:["",[Validators.required,Validators.email]],
      Phone:[""],
      subject:[''],
      MessageText:["",[Validators.required]],
    });
  }
  error='';
  isSubmitted:boolean=false;
  contactUs(){
    this.isSubmitted = true;
    if (this.form.valid) {
    this.buttonLoaded=true;
    this._apiService.post(`/services/app/EmailService/SendContactUS?Name=${this.form.value.Name}&Mail=${this.form.value.Mail}&Phone=${this.form.value.Phone}&subject=${this.form.value.subject}&MessageText=${this.form.value.MessageText}`,'').subscribe(
      (res)=>{
        //@ts-ignore
        if(res['success']){
          this.buttonLoaded=false;
          this.message.create('success','شكرا لتواصلك معنا ');
        }
      }, (error)=>{
        // console.log(error.error.error.details)
        this.error=error.error.error.details;
        this.message.create('error',this.error || 'تاكد من البيانات المدخلة');
        // this.form.reset();
        this.error=''
      })
  }
  }
  contactImg=[{url:''}]
 imgUrl:string=`${environment.baseUrl}/wwwroot/Uploads/panal/`;

  getContactImg(){
    this._apiService.get(`/services/app/HomePanal/GetAllContactUSPanal?tenantId=1`).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.contactImg =res['result']
        }
      })
    )
  }
}
