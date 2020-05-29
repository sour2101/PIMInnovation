import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from '../../models/navItem';
import { GlobalVariable } from '../../../shared/pimConstant'; 

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html' 
})
export class TopNavComponent implements OnInit {

  @Input() navItems:NavItem[];
  admin:boolean;
  
  constructor(
  ) { 

    this.admin =GlobalVariable.currentUser.admin;
    this.admin=true;
    // this.navItems =[
    //   {id:1,name:"home",link:"/home",parentId:0,childrens:null},
    //   {id:2,name:"MasterData Management",link:"",parentId:0,childrens:[
    //     {id:3,name:"Menu",parentId:0,link:"/menuList",childrens:null}
    //   ]}];
    
  }

  ngOnInit() {
  }




}
