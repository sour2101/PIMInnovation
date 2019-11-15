import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../../shared/pimConstant';
import { TreeNode, DialogService } from 'primeng/api';
import { TranslateService } from "@ngx-translate/core";
import { CategoryService } from 'src/app/home/services/category.service';
import { EntityComponent } from 'src/app/home/components/entity/entity.component';
import { UserPreferenceService } from 'src/app/home/services/user-preference.service';


@Component({
  selector: 'app-search-entity',
  templateUrl: './search-entity.component.html',
  styleUrls: ['./search-entity.component.css'],
  providers: [DialogService]
})
export class SearchEntityComponent implements OnInit {

  public catalogList: any;
  public categoryList: any;
  entities: string[];
  msg: string;
  orgName: string;
  catalogName: string;
  todayDate: Date;
  uiLocalName: string;
  treeData: TreeNode[];

  constructor(
    public dialogService: DialogService,
    private _userPrefService: UserPreferenceService,
    private translate: TranslateService,
    private _pimService: CategoryService) { }

  ngOnInit() {
    this.initialize();
  }

  public initialize() {
    this.todayDate = new Date();
    this.getCategory();
    this.getUserPref();
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

}
