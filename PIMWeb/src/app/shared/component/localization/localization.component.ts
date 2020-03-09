import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { GlobalVariable } from '../../pimConstant';
 

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.css']
})
export class LocalizationComponent implements OnInit {

  @Input() multiselect:boolean=false;
  @Input() form: any;
  languageId='';
  languageList;
  msg;

  constructor(
    private _appService:AppService
  ) { 
   this.getLocale();
  }

  ngOnInit() {
  }

  getLocale(){
    this._appService.get("languages")
    .subscribe((res) => { 
        this.languageList = res;        
       },
    error => this.msg = <any>error);
  }

}
