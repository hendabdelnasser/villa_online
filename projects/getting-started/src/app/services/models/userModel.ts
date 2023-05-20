export class UserModel{
    userName:string="";
    id:number=0;
    name:string="";
    surname:string="";
    emailAddress:string="";
    phoneNumber:string="";
    address:string="";
    isActive:boolean=false;
    fullName:string="";
    lastLoginTime:Date=new Date;
    creationTime:Date=new Date;
    regionId:number=1;
    notes:string="";
    userType:number=1;
    roleNames:string[]=[];
}
