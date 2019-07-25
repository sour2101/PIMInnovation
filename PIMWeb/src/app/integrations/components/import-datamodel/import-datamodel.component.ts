import { Component, OnInit  } from '@angular/core'; 
import { FileService } from '../../../core/services/file.service';
import { ToastsManager } from 'ng6-toastr'; 
import { TranslateService } from "@ngx-translate/core";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-import-datamodel',
  templateUrl: './import-datamodel.component.html' 
})
export class ImportDatamodelComponent implements OnInit {

  msg;
  constructor(private _fileservice:FileService,private trasnlate:TranslateService,private toastr:ToastsManager,private router:Router){}

  ngOnInit () {  }

  myUploader(event):void {
      
    var fileToUpload:File = event.files[0];
    this._fileservice.fileupload(environment.file_url,fileToUpload)
    .subscribe((res) => { 
        this.toastr.success("File uploaded successfully");
        this.router.navigate(["/integrationjobs"]);
    },
    error => this.msg = <any>error);
}

}
