import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalsComponent implements OnInit {

  listOfOption1: Array<{ label: string; value: string }> = [];
  listOfTagOptions1 = [];
  listOfOption2: Array<{ label: string; value: string }> = [];
  listOfTagOptions2 = [];
  listOfOption3: Array<{ label: string; value: string }> = [];
  listOfTagOptions3 = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption1 = children;
    this.listOfOption2 = children;
    this.listOfOption3 = children;
  }
  @Input()
    requiredFileType:string='';

    fileName = '';
    uploadProgress:number=0;
    uploadSub: Subscription = new Subscription;


    onFileSelected(event:any) {
      const file:File = event.target.files[0];

      if (file) {
          this.fileName = file.name;
          const formData = new FormData();
          formData.append("thumbnail", file);

          const upload$ = this.http.post("/api/thumbnail-upload", formData, {
              reportProgress: true,
              observe: 'events'
          })
          .pipe(
              finalize(() => this.reset())
          );

          this.uploadSub = upload$.subscribe(event => {
            if (event.type == HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round(100 * (event.loaded / 100));
            }
          })
      }
    }

cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}

reset() {
  this.uploadProgress = 0;
  this.uploadSub.unsubscribe();
}
}
