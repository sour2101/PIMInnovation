import { Component, EventEmitter, Output } from '@angular/core';
import { GlobalVariable } from '../../../shared/pimConstant';
import { AppService } from '../../../app.service';

import { TreeNode, DialogService } from 'primeng/api';
import { TranslateService } from "@ngx-translate/core";
import { EntityComponent } from '../entity/entity.component';
import { CategoryService } from '../../services/category.service';
import { environment } from 'src/environments/environment';
import { UserPreferenceService } from '../../services/user-preference.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  styles: [`
        .ui-grid-row {
            text-align: center;
        }
        .ui-grid {
            margin: 10px 0px;
        }
        .ui-grid-row > div {
            padding: 4px 10px;
        }
    `],
  providers: [DialogService]
})
export class DashboardComponent {


  public userPrefList: any;
  public organizationList: any;
  public catalogList: any;
  public categoryList: any;
  entities: string[];
  msg: string;

  orgName: string;
  catalogName: string;
  todayDate: Date;
  uiLocalName: string;
  treeData: TreeNode[];
  cmpName: string = "HomeComponent";
  knOptions = {
    readOnly: true,
    size: 100,
    unit: '',
    textColor: '#000000',
    fontSize: '12',
    fontWeigth: '700',
    fontFamily: 'Roboto',
    valueformat: 'percent',
    max: 200,
    trackWidth: 19,
    barWidth: 20,
    trackColor: '#D8D8D8',
    barColor: '#FF6F17',
    subText: {
      enabled: true,
      fontFamily: 'Verdana',
      font: '10',
      fontWeight: 'bold',
      text: '',
      color: '#000000',
      offset: 7
    },
  }
  workflows = [{ count: 162, stage: 'Create Design part' },
  { count: 11, stage: 'MIS Approval' },
  { count: 4, stage: 'Marketing Steward attibute approval' }];
  @Output() childCmp = new EventEmitter<string>();
  constructor(private _appService: AppService,
    private _userPrefService: UserPreferenceService,
    public dialogService: DialogService,
    private translate: TranslateService,
    private _pimService: CategoryService
  ) {

    this.initialize();

  }

  sendComponantName() {
    this.childCmp.emit(this.cmpName);
  }


  public initialize() {
    this.todayDate = new Date();
    this.getUserPref();
  }

  getUserPref() {
    this._userPrefService.getUserPreference(GlobalVariable.currentUser.token.userId)
      .subscribe((res) => {
        this.userPrefList = res;
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
