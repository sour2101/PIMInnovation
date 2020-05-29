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
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { OrganizationMapping } from '../../models/OrgMapping';
import { RoleService } from 'src/app/roles/services/role.service';
import { OrgMappingService } from '../../services/org-mapping.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-organization-chart',
  templateUrl: './organization-chart.component.html',
  styleUrls: ['./organization-chart.component.css'],
  providers:[DialogService]
})
export class OrganizationChartComponent implements OnInit {
  @ViewChild(ContextMenuComponent,{ read: true, static: false }) public basicMenu: ContextMenuComponent;
   
  msg;
  orgmap:OrganizationMapping;
  mappingHeader:string;
  _mappingForm:FormGroup;
  displayDialog:Boolean=false;
  role:boolean=false;
  tax:boolean=false;
  attr:boolean=false;
  roleList;
  attributeList;
  taxonomyList;
  organizationId:number;
  public orglist=Array<OrgList>();
  public treeData:TreeNode[];
  public menuItem:MenuItem[];


    constructor(
      private _pimService:OrganizationService,
      public dialogService: DialogService,
      private translate:TranslateService,
      private _formBuilder:FormBuilder,
      public toastr: ToastsManager,
      public _roleService:RoleService,
      public _orgMapService:OrgMappingService 
      ) { 
      this.initialize();
  }  

  ngOnInit() {
    this.treeData=[];
     this.menuItem=[{label:"Add Subgroup",icon: 'pi pi-fw pi-plus'},
     {label:"Edit",icon: 'pi pi-fw pi-pencil'}]
  }

  initialize(){
    this.treeData=[];
    this.loadOrganization();
    this.orgmap = new OrganizationMapping();
    this._mappingForm = this.getOrgmappingForm(this.orgmap);
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

  unflatten(arr) :OrgList{
    var  tree={shortName:null,id:0,parentId:0,longName:null,label:null,logo:null,children:[]},
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
          tree.logo=mappedElem.logo;
        }
      }
    }    
    return tree;
  }


  //Add Edit Delete the sub section 
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
      width:"70%"
  });

    ref.onClose.subscribe((result) => {
      if(result!=null)
        this.loadOrganization();
    });

  }

  //get mappings
  getOrgmappingForm(data):FormGroup{
    return this._formBuilder.group({
      selectedValues:new FormControl(data),
      orgMapping:new FormControl([])
    })
  }

  //Mappings for role
  mapRoles(orgId){
    this.translate.get('data.lblRoleMapping').subscribe((res)=> 
    {
      this.mappingHeader = res
    });

    this.displayDialog=true;
    this.role=true;
    this.organizationId=orgId;
    let orgAttrList = this._roleService.getAllRole();
    let orgMapService= this._orgMapService.getOrgMapping(orgId,"role");
    forkJoin([orgAttrList,orgMapService])
    .subscribe(res=>{
        let val=[];
        if(res[1]!==null && res[1].length>0){
          res[1].forEach(r => {
            val.push({id:r.roleId,name:r.roleName});
          });

        this.roleList=res[0];
        this._mappingForm = this.getOrgmappingForm(val);
      }

    });
  }

  //Mappings for user
  mapAttributes(orgId){
    this.translate.get('data.lblAttributeMapping').subscribe((res)=> 
    {
      this.mappingHeader = res
    });

    this.displayDialog=true;
    this.attr=true;
    this.organizationId=orgId;
    let orgAttrList = this._orgMapService.getAttributeList();
    let orgMapService= this._orgMapService.getOrgMapping(orgId,"attr");
    forkJoin([orgAttrList,orgMapService])
    .subscribe(res=>{
      let val=[];
      if(res[1]!==null && res[1].length>0){
        res[1].forEach(r => {
           val.push({id:r.attributeId,name:r.attrName});
         });

      this.attributeList=res[0];
      this._mappingForm = this.getOrgmappingForm(val);
      }
    });
  }

  //Mappings for taxonomy
  mapTaxonomy(id){}

  back(){
    this.orgmap = new OrganizationMapping();
    this._mappingForm = this.getOrgmappingForm(this.orgmap);
    this.displayDialog=false;
    this.role=false;
    this.attr=false;
    this.tax=false;    
  }

  //save the mappings
  submit(mappingDetails){
    let submitMapping ;
      mappingDetails.value.selectedValues.forEach(r => {   
        mappingDetails.value.orgMapping.push({
          id:0,
          roleId : this.role? r.id:null,
          orgId:this.organizationId,
          attributeId:this.attr? r.id:null,
          taxonomyId:null
        });
      });

    submitMapping=this._orgMapService.saveOrgMapping(mappingDetails.value.orgMapping);

    submitMapping.subscribe(res=>{
      this.toastr.success(res);
      this.back();
    });  
  }
}
