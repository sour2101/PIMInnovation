import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from '../../models/navItem';
import { GlobalVariable } from '../../../shared/pimConstant';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html' 
})
export class TopNavComponent implements OnInit {

admin:boolean;
  navItems:NavItem[];
  constructor() { 
    this.admin =GlobalVariable.currentUser.admin;
    this.navItems =[
      {id:1,name:"home",link:"/home",childrens:null},
      {id:2,name:"entity",link:"/entity",childrens:null},
      {id:3,name:"integration",link:"",childrens:[
        {id:4,name:"importdatamodel",link:"/importdatamodel",childrens:null}
      ]}];
  }

  ngOnInit() {
  }

}
