import { Component, OnInit,ViewChild } from '@angular/core';
import { OrgList } from  '../../models/orgList';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';
import { DialogService } from 'primeng/api';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { TranslateService } from "@ngx-translate/core";
import { TreeNode,MenuItem } from 'primeng/api';
import { OrganizationService } from '../../services/organization.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-organization-chart',
  templateUrl: './organization-chart.component.html',
  styleUrls: ['./organization-chart.component.css'],
  providers:[DialogService]
})
export class OrganizationChartComponent implements OnInit {
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
   
  msg;
  loc;
 public orglist=Array<OrgList>();
 public treeData:TreeNode[];
 public menuItem:MenuItem[];
    constructor(private _pimService:OrganizationService,public dialogService: DialogService,private translate:TranslateService,public toastr: ToastsManager) { 
      this.initialize();
  
  }  

  ngOnInit() {
    this.treeData=[];
    // this.menuItem=[{label:this.loc.lblAddsubsection,icon: 'pi pi-fw pi-plus'},{label:this.loc.lbleditOrg,icon: 'pi pi-fw pi-pencil'}]
  }

  initialize(){
    this.treeData=[];
    debugger;
    this.loadOrganization();
  }

  loadOrganization(){
    this.orglist=[];
    this._pimService.getOrganizations()
    .subscribe((res) => { 
      this.orglist.push(this.unflatten(res)); 
      this.treeData.push(this.unflatten(res));  
     },
  error => this.msg = <any>error);
  }

  openCm(event, cm) {
    event.preventDefault();
    event.stopPropagation();
    cm.show(event);
    return false;
}

  unflatten(arr) :OrgList{
    var  tree={shortName:null,id:0,parentId:0,longName:null,label:null,children:[]},
        mappedArr = {},
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['label']=arrElem.shortName;
      mappedArr[arrElem.id]['children'] = [];
    }


    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
       
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentId) {
          mappedArr[mappedElem['parentId']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.shortName=mappedElem.shortName;
          tree.longName=mappedElem.longName;
          tree.id=mappedElem.id;
          tree.label=mappedElem.shortName;
          tree.parentId=mappedElem.parentId;
          tree.children=mappedElem.children;
        }
      }
    }    
    return tree;
  }


  addSubSection(parentId){
    this.openDialog(0,parentId);
  }

  editOrg(id,parentId){
    this.openDialog(id,parentId);
  }

  deleteOrg(id){
    this._pimService.deleteOrganization(id)
    .subscribe(res=>{
      this.toastr.success(res);
      this.loadOrganization();
    });
  }

  openDialog(id,parentId): void {
    let header;
    this.translate.get('data.lblAddsubsection').subscribe((res)=> 
    {header = res});

    const ref = this.dialogService.open(OrganizationFormComponent, {
      data: { orgId: id,parentId:parentId},
      header: header,
      width:"50%"
  });

  ref.onClose.subscribe((result) => {
    if(result!=null)
      this.loadOrganization();
  });

  }
  

}
