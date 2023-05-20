export class NotesModel{
    id:number=0;
    userId: number=0;
    user: string='';
    projectId: number=0;
    project:  string='';
    projectPhaseId: number=0;
    projectPhase:  string='';
    noteBody:  string='';
    creationTime:Date=new Date;
    userTypeId:number=4
}
