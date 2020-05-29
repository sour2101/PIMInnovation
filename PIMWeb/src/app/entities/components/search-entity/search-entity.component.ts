import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../../shared/pimConstant';
import { TreeNode, DialogService } from 'primeng/api';
import { TranslateService } from "@ngx-translate/core";
import { CategoryService } from 'src/app/home/services/category.service';
import { EntityComponent } from 'src/app/home/components/entity/entity.component';
import { UserPreferenceService } from 'src/app/home/services/user-preference.service';
import { EntityService } from '../../services/entity.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-search-entity',
  templateUrl: './search-entity.component.html',
  styleUrls: ['./search-entity.component.css'],
  providers: [DialogService]
})
export class SearchEntityComponent implements OnInit {

  public catalogList: any;
  public categoryList: any;
  loading:boolean=false;
  entities: string[];
  msg: string;
  orgName: string;
  catalogName: string;
  todayDate: Date;
  columnList:any[];
  uiLocalName: string;
  treeData: TreeNode[];
  entityList:any[];
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  filterForm:FormGroup;

  constructor(
    public dialogService: DialogService,
    private _userPrefService: UserPreferenceService,
    private translate: TranslateService,
    private _entityService:EntityService,
    private _pimService: CategoryService,
    private _formBuilder:FormBuilder
    ) { }

  ngOnInit() {
    this.initialize();
  }

  public initialize() {
    this.loading=true;
    this.pageSize=10;
    this.pageNumber=1;
    this.sortBy='id';
    this.sortOrder='false'; 
    this.columnList=["attributeValue","catalogId"];
    this.todayDate = new Date();
    this.getCategory();
    this.getUserPref();
    this.filterForm =this.getFilterForm();
  }

  getFilterForm():FormGroup{
    return  this._formBuilder.group({
      entities:new FormControl(""),
      partNumbers:new FormControl(""),
      soa:new FormControl("")
    });
  }


  getCategory(): void {
    this._pimService.getCategory(GlobalVariable.dataLocal)
      .subscribe((res) => {
        this.categoryList = res;
        this.treeData = this.categoryList;
      },
        error => this.msg = <any>error);
  }

  getUserPref() {
    this._userPrefService.getUserPreference(GlobalVariable.currentUser.token.userId)
      .subscribe((res) => {
        this.orgName = res.organizationName;
        this.catalogName = res.catalogName;
      },
        error => this.msg = <any>error);
  }

  getEntityList(){
    
    this._entityService.getEntityList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm)
    .subscribe(res=>{
      this.entityList = res;
    })
  }



  changeCatalog() {
    this.openDialog(this.orgName, this.catalogName);
  }

  openDialog(orgId, catId): void {
    let header;
    this.translate.get('data.lblOrgHeader').subscribe((res) => { header = res });
    const ref = this.dialogService.open(EntityComponent, {
      data: { orgId: orgId, catId: catId },
      header: header,
      width: '500px'
    });

    ref.onClose.subscribe((result) => {
      if (result !== null && result !== undefined) {
        this.orgName = result.organizationId;
        this.catalogName = result.catalogId;
        this.initialize();
      }
    });
  }

  submit(){
    this.getEntityList();
  }

}
