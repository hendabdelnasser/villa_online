export class projectModel{
    id:number=1;
    name:string="";
    description:string="";
    image:string="";
    userName:string='';
    projectTypeId:number=1;
    regionId:number=1;
    date:string="";
    percent:number=0;
    implementPeriod:number=1;
    implementPeriodType:number=1;
    isActive:boolean=true;
    tenantId:number=1;
    userId:number=1;
    totalWight:number=0
    projectServices:serviceModel[]=[];
    projectDocuments:Doc[]=[];
    strProjectDocuments:string[]=[]
}

/***
 * about Service
 */
export class serviceModel{
  serviceId:number=0;
  id:number=0;
  name:string="";
  description:string="";
  projectId:number=1;
  phases:phaseModel[]=[];
  projectPhases:phaseModel[]=[];
  service?:ServiceInfo=new ServiceInfo();
}
 export class ServiceInfo{
  description: string="";
id: number=0;
isActive: boolean=false;
name?: string="";
phases: phaseModel[]=[];
tenantId: number=1
 }
/***
 * about Phase
 */
 export class phaseModel{
  data?:InputsInfo[]=[];
  dateStart:Date=new Date;
  dateDone:Date=new Date;
  doneNote?:string='';
  doneWight:number=0;
  id:number=1;
  implementPeriod:number=1;
  implementPeriodType:number=1;
  inputs?:InputsOutputs[]=[];
  inputsNames?:InputsInfo[]=[];
  isReview:boolean=false;
  isDone:boolean=false;
  isCurrant:boolean=false;
  outputsNames?:InputsInfo[]=[];
  outputs?:InputsOutputs[]=[];
  phaseId:number=1;
  projectServiceId:number=1;
  review?:number=0;
  reviewDate?:Date= new Date;
  reviewNote?:string='';
  userId:number=1;
  title:string="";
  userName?:string=''
  }

export class InputsInfo{
  id:number=0;
  name:string="";
  type:number=0;
  value:string=''
}
export class InputsOutputs{
  id:number=0;
  note:string='';
  typeID:number=0;
  userId:number=0;
  projectPhaseId:number=0;
  projectPhaseDocumentLists:InputOutputDoc[]=[]
}
export class InputOutputDoc{
  id:number=0;
  name:string='';
  url:string='';
  projectPhaseDocumentId:number=0
}
/***
 * about ProjectDocument
 */
 export class projectDocumentModel{
  id:number=1;
  userId:number=0;
  projectPhaseDocumentLists:Doc[]=[];
}
export class Doc{
  id:number=0;
  name:string="";
  url:string="";
  projectPhaseDocumentId:number=0
}
export class projectTypeModel{
  id:number=1;
  name:string="";
  isActive:boolean=true;
  tenantId:number=1;
}

export class AddPhase{
  projectID:number=0;
  id?:number=0;
  phaseId:number=0;
  implementPeriod:number=0;
  implementPeriodType:number=0;
  userId:number=0;
  review?:boolean=false;
  dateStart?: Date=new Date;
  isDone?:boolean=false;
  dateDone?:Date=new Date;
  isCurrant?:boolean=false;
  projectServiceId:number=0;
  serviceId:number=0;
  doneWight:number=0
}




