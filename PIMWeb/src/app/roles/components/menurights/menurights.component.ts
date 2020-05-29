import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { MenuService } from 'src/app/menu/services/menu.service';
import { menuRights } from '../../models/menuRights';
import { MenuRightsService } from '../../services/menu-rights.service';

@Component({
  selector: 'app-menurights',
  templateUrl: './menurights.component.html',
  styleUrls: ['./menurights.component.css']
})
export class MenurightsComponent implements OnInit {

  menus;
  submenus;
  roleId;
  menuRights:menuRights;
  menuRightsForm:FormGroup;
  constructor(
    private _menuRightService:MenuRightsService,
    private _formBuilder:FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.getMenus();
    this.menuRights =  new menuRights();
    this.menuRightsForm=this.getMenuRightsForm(this.menuRights);
    if (this.config.data.roleId !== null && this.config.data.roleId !== undefined) {
      this.roleId=this.config.data.roleId ;
    }
   }

  ngOnInit() {
  }

  getMenuRightsForm(data:menuRights):FormGroup{
    return this._formBuilder.group({
      menuId:new FormControl(data.menuId),
      subMenuId:new FormControl(data.subMenuId),
      roleId:new FormControl(data.roleId)
    });
  }

  getMenus(){
    this._menuRightService.getAllMenu(1,1)
    .subscribe(res=>{
      this.menus =res;
    });

  }

  getSubmenus(e){
    debugger;
    let sm =[];
    for(let i =0;i<e.value.length;i++){
      for(let j=0;j<e.value[i].childrens.length;j++)
          sm.push(e.value[i].childrens[j]);
    }
    this.submenus = sm;
  }

  submit(menuRightsDetails){
    debugger;
    let mr:menuRights[]=[];
    menuRightsDetails.value.subMenuId.forEach(sm => {
      mr.push({roleId:this.roleId,menuId :sm.parentId,subMenuId: sm.id});
   });

    menuRightsDetails.value.menuId.forEach(m => {
      debugger;
      if(mr.filter(f => f["menuId"].toString().includes(m.id)).length==0){
        mr.push({roleId:this.roleId,menuId :m.id,subMenuId: null});
      }
    });
    this._menuRightService.saveMenuRight(mr)
    .subscribe(res=>{
      
    });
  }

  back(){}

}
