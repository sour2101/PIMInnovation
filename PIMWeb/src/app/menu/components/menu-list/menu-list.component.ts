import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MenuService } from '../../services/menu.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuModel } from '../../Model/menu';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  providers:[ConfirmationService]
})
export class MenuListComponent implements OnInit {

  loading:boolean=false;
 menuForm:FormGroup;
 menu:MenuModel;
  filterForm:FormGroup;
  menuList:MenuModel[];
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  totalRecords:number;
  displayDialog:boolean=false;
  constructor(
    public _menuService:MenuService,
    public router:Router,
    private toastr:ToastsManager,
    private translate:TranslateService, 
    private _formBuilder:FormBuilder,
    private _confirmationService:ConfirmationService
  ) { 
    this.initialize();
  }

  ngOnInit() {
  }

  initialize(){
    this.loading=true;
    this.pageSize=10;
    this.pageNumber=1;
    this.sortBy='id';
    this.sortOrder='false'; 
    this.filterForm = this._formBuilder.group({
      name:new FormControl(""),
      localeName:new FormControl("")
    });
    this.menu = new MenuModel();
    this.menuForm =  this.getMenuForm(this.menu);

  }

  getMenuForm(data:MenuModel):FormGroup{
    return this._formBuilder.group({
      id:new FormControl(data.id),
      name:new FormControl(data.name,Validators.required),
      link:new FormControl(data.link,Validators.required),
      languageId:new FormControl(data.languageId,Validators.required)
    });
  }

  getMenu(id){
    this._menuService.getMenu(id)
    .subscribe(res=>{
      this.menuForm=this.getMenuForm(res);
    });
  }

  LoadMenuList(pageSize,pageNumber,sortBy,sortOrder,filterBy){
    this.loading=true;
    this._menuService.getMenuList(pageSize,pageNumber,sortBy,sortOrder,filterBy)
    .subscribe((res) => { 
      this.totalRecords=res.totalCount;
      this.menuList = res.entries;
      this.loading=false;
     });
  }

  
  pageChange(event){
    this.pageSize= event.rows!==undefined?event.rows:this.pageSize ;
    this.pageNumber=event.page!==undefined?event.page+1:this.pageNumber;
    this.LoadMenuList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  sorting(event){
    this.sortBy=event.sortField!==undefined?event.sortField:this.sortBy;
    this.sortOrder=event.sortOrder===1?'true':'false'; 
    this.LoadMenuList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  filtering(){
    this.LoadMenuList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
  }

  editMenu(id){
    this.displayDialog=true;
    this.getMenu(id);
  }

  addSubMenu(menuId){ 
    this.router.navigate(["submenu/"+menuId]);
  }

  back(){
    this.displayDialog=false;
  }

  deleteMenu(selectedMenu){
    
    this._confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._menuService.deleteMenus(selectedMenu.id)
        .subscribe((res)=>{
          this.toastr.success(res);
          this.LoadMenuList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
        });
      },
      reject: () => {
          return false;
      }
  });
   
  }

  addMenu(){
    this.displayDialog=true;
    this.menuForm =  this.getMenuForm(this.menu);
  }

  submit(menuDetails){
    let submitMenu;
    debugger;
    if(menuDetails.value.id===0)
    submitMenu=this._menuService.saveMenu(menuDetails.value);
    else
    submitMenu=this._menuService.updateMenu(menuDetails.value);
    
    submitMenu.subscribe(res=>{
      this.toastr.success(res);
      this.initialize();
      this.filtering();
      this.back();
    });  
  }
  

}
