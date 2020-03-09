import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'; 
import { MenuModel } from '../../Model/menu';
import { Router, ActivatedRoute } from '@angular/router';
import { SubMenuService } from '../../services/submenu.service';
import { ConfirmationService } from 'primeng/api';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css'],
  providers:[ConfirmationService]
})
export class MenuFormComponent implements OnInit {

  submenuForm:FormGroup;
  filterForm:FormGroup;
  loading:boolean=false;
  menuParentId:number;
  menu:MenuModel;
  submenuList:MenuModel[];
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  totalRecords:number;
  displayDialog:boolean=false;
  constructor(
    public _submenuService:SubMenuService,
    public router:Router,
    private toastr:ToastsManager,
    private translate:TranslateService, 
    private _formBuilder:FormBuilder,
    private _confirmationService:ConfirmationService,
    private route: ActivatedRoute 
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
    
    this.route.params.subscribe(params => {
      this.menu = new MenuModel();
      this.menuParentId=params.id;
      this.submenuForm=this.getForm(this.menu);
      this.filterForm = this._formBuilder.group({
        name:new FormControl(""),
        parentName:new FormControl(""),
        parentId:new FormControl(params.id),
        localeName:new FormControl("")
      });
      
      this.LoadSubMenuList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
    
    });
    
  }

  getForm(data:MenuModel):FormGroup{
    return this._formBuilder.group({
      id:new FormControl(data.id),
      name :new FormControl(data.name,Validators.required),
      link:new FormControl(data.link,Validators.required),
      parentId:new FormControl(this.menuParentId),
      languageId:new FormControl(data.languageId,Validators.required)
    });
  }

  getSubMenu(id){
    this._submenuService.getSubMenu(id)
    .subscribe(res=>{
      this.submenuForm = this.getForm(res);
    })
  }

  LoadSubMenuList(pageSize,pageNumber,sortBy,sortOrder,filterBy){
    this.loading=true;
    this._submenuService.getSubMenuList(pageSize,pageNumber,sortBy,sortOrder,filterBy)
    .subscribe((res) => { 
      this.totalRecords=res.totalCount;
      this.submenuList = res.entries;
      this.loading=false;
     });
  }


  editSubMenu(id){
    this.displayDialog=true;
    this.getSubMenu(id);
  }

  deleteSubMenu(selectedMenu){
    
    this._confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._submenuService.deleteSubMenus(selectedMenu.id)
        .subscribe((res)=>{
          this.toastr.success(res);
          this.LoadSubMenuList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
        });
      },
      reject: () => {
          return false;
      }
  });
   
  }

  closeDialog(){
    this.displayDialog=false;
  }

  addSubMenu(){
    this.displayDialog=true;
  }

  submit(menuDetails){
    let submitMenu;
    if(menuDetails.value.id===0)
    submitMenu=this._submenuService.saveSubMenu(menuDetails.value);
    else
    submitMenu=this._submenuService.updateSubMenu(menuDetails.value);
    
    submitMenu.subscribe(res=>{
      this.toastr.success(res);
      this.initialize();
    });  
  }

  back(){
    this.router.navigate(["menuList"]);
  }



}
