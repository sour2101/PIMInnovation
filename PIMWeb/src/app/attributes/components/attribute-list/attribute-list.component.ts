import { Component, OnInit } from '@angular/core';
import { DialogService, ConfirmationService, TreeNode, MenuItem } from 'primeng/api';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AttrService } from '../../services/attr.service';

import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/app.service';

import { AttributeFormComponent } from '../attribute-form/attribute-form.component';
import { AttributegroupFromComponent } from '../attributegroup-from/attributegroup-from.component';
@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  providers:[ConfirmationService]
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
   

  constructor( public dialogService: DialogService,
    private toastr:ToastsManager,
    private translate:TranslateService,
    private _formBuilder:FormBuilder,
    private _confirmationService:ConfirmationService,
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
      this.attrTypeList=res;
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
   if(event.node){
    this._pimService.getById(environment.attributeGroup_url,event.node.id)
    .subscribe(res=>{
      event.node.children = res;
    });
   }
 }
 
 nodeSelect(event){
   if(event.node){
     this.showList=true;
    this.filterForm.value.attributeGroupId = event.node.id;
    this.loadAttributeList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
   }
 }


  openDialog(attrId): void {
    let header;
    this.translate.get('data.lblAddNewAttribute').subscribe((res)=> 
    {header = res});

    const ref = this.dialogService.open(AttributeFormComponent, {
      data: { attrId: attrId,groupId: this.filterForm.value.attributeGroupId},
      header: header,
      width:'80%'
      });   
      
      ref.onClose.subscribe(() => {
        this.loadAttributeList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
      });
  }

  addAttribute(){
    this.openDialog(null);
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


  editAttribute(selectedAttribute){
    this.openDialog(selectedAttribute.id);
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
