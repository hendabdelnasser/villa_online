export class NewServiceModel{
  id: number=0;
  title: string='';
  implementPeriod: string='';
  implementPeriodType: string='';
  userId: number=0;
  inputs: Inputs[]=[];
  outputs: string[]=[]
}
export class Inputs{
  type:string='';
  name:string=''
}
