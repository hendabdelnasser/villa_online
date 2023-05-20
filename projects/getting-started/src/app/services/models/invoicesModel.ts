export class InvoiceModel{
    id: number=0;
    projectId:  number=0;
    invoiceNo:  number=0;
    customerId:  number=0;
    customerName: string='';
    userId:  number=0;
    userName: string='';
    price:  number=0;
    date: Date=new Date;
    status:  number=0;
    phases: Phases[]=[];
    projectName:string=''
}
export class InvoiceCreate{
  projectId: number=0;
  customerId: number=0;
  userId:number=0;
  price: number=0;
  date:Date= new Date
}
export class Phases{

    id:  number=0;
    title:string='';
    implementPeriod:  number=0;
    implementPeriodType:  number=0;
    userId:  number=0;
    userName: any;
    inputs: any;
    outputs: any

}
