import { Component, OnInit } from '@angular/core';
import { DialogService, ConfirmationService, TreeNode, MenuItem } from 'primeng/api';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AttrService } from '../../services/attr.service';

import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/app.service';
 
import { AttributegroupFromComponent } from '../attributegroup-from/attributegroup-from.component';
import { AttributebrsComponent } from '../attributebrs/attributebrs.component'; 
import { AttributeService } from '../../services/attributeService';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  providers:[ConfirmationService,AttributeService]
})
export class AttributeListComponent implements OnInit {

  attributeForm;
  filterForm;
  showList=false;
  attributeList:[];
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  totalRecords:number;
  menuItems:MenuItem[];
  selectedNode:TreeNode;
  attrTypeList:TreeNode[];
  attrGroupList:TreeNode[]; 
  attrGroupId;
  attrTypedId;

  constructor( 
    public dialogService:DialogService,
    private toastr:ToastsManager,
    private translate:TranslateService,
    private _formBuilder:FormBuilder,
    private _confirmationService:ConfirmationService,
    private _attributeService:AttributeService,
    private _pimService:AppService,
    private _attrService:AttrService ) {
      this.initialize();
     }

  ngOnInit() {
  }

  initialize(){
    this.menuItems = [
      {label: 'Add Group', icon: 'fa fa-plus', command: (event) => this.addAttributeGroup(this.selectedNode)}
    ];

    this.getAttributeType();
    this.pageSize=10;
    this.pageNumber=1;
    this.sortBy='id';
    this.sortOrder='false'; 
    this.filterForm = this._formBuilder.group(
      {
        shortName:new FormControl(""),
        attributeGroupId:new FormControl("")
      });
  }


  getAttributeType(){
    this._pimService.get(environment.attributeType_url)
    .subscribe(res=>{
      this.attrGroupList=res;
      if(this._attributeService.getGroupId()!==null){
        this.attrGroupId = this._attributeService.getGroupId();
        this.loadNode(this._attributeService.getGroupId());
      }
    });
  }

   

//Paginator
  pageChange(event){
    this.pageSize= event.rows!==undefined?event.rows:this.pageSize ;
    this.pageNumber=event.page!==undefined?event.page+1:this.pageNumber;
    this.loadAttributeList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
  }

  sorting(event){
    this.sortBy=event.sortField!==undefined?event.sortField:this.sortBy;
    this.sortOrder=event.sortOrder===1?'true':'false'; 
    this.loadAttributeList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
  }

  filtering(){
    if(this.filterForm.value.attributeGroupId!=="")
      this.loadAttributeList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
  }

 //Tree events
 loadNode(event){
   if(event){
    this._pimService.getById(environment.attributeGroup_url,event)
    .subscribe(res=>{
      this._attributeService.setGroupId(event);
      this.attrTypeList = res;
      if(this._attributeService.getTypeId()!==null){
        this.attrTypedId=this._attributeService.getTypeId();
        this.nodeSelect(this._attributeService.getTypeId());
      }
    });
   }
 }
 
 nodeSelect(event){
   if(event){
     this.showList=true;
     this._attributeService.setTypeId(event);
    this.filterForm.value.attributeGroupId = event;
    this.loadAttributeList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
   }
 }


  addAttributeGroup(node){
    let header;
    
    this.translate.get('data.lblAddAttributeGroup').subscribe((res)=> 
    {header = res});

    const ref = this.dialogService.open(AttributegroupFromComponent, {
      data: { parentId: node.id,id:null},
      header: header,
      width:'80%'
      });   
      
      ref.onClose.subscribe(() => {
        this.getAttributeType();
      });
  }
 


  deleteAttribute(selectedAttribute){
    
    this._confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._attrService.deleteAttribute(selectedAttribute.id)
        .subscribe((res)=>{
          this.toastr.success(res);
          this.loadAttributeList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
        });
      },
      reject: () => {
          return false;
      }
  });
}

  loadAttributeList(pageSize,pageNumber,sortBy,sortOrder,filterBy){
    this._attrService.getAttributeList(pageSize,pageNumber,sortBy,sortOrder,filterBy)
    .subscribe((res) => { 
      this.totalRecords=res.totalCount;
      this.attributeList = res.entries;
     });
  }

  

}
