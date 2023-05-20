import { projectDocumentModel } from "./projectModel";

export class CreateprojectModel{
    id:number=1;
    name:string="";
    image:string="";
    description:string="";
    projectTypeId:number=1;
    regionId:number=1;
    date:string="";
    implementPeriod:number=1;
    implementPeriodType:number=1;
    userId:number=1;
    projectService:CreateserviceModel[]=[];
    projectDocument:projectDocumentModel[]=[];

}
 /* about Service
 */
export class CreateserviceModel{
  serviceId:number=0;
  name:string='';
  projectPhase:CreatephaseModel[]=[];
}
/***
 * about Phase
 */
 export class CreatephaseModel{
    id:number=1;
    title:string='';
    phaseId:number=1;
    implementPeriod:number=1;
    implementPeriodType:number=1;
    userId:number=1;
    doneWight:number=0;
    projectServiceId:number=1;
    review:boolean=false;
    isDone:boolean=false;
    isCurrant:boolean=false;
    dateStart:Date=new Date;
    dateDone:Date=new Date;
  }

