import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LookupTableService } from 'src/app/lookup-tables/services/lookup-table.service';

@Component({
  selector: 'lookup',
  templateUrl: './lookup.component.html'
})
export class LookupComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: FormGroup;

  lookupColumnList = [];
  tableData: any[];
  pageSize: number;
  pageNumber: number;
  sortBy: string;
  sortOrder: string;
  constructor(
    private _lookupTableService: LookupTableService
  ) { }

  ngOnInit() {
    this.getLookUptable();
  }

  camalCase(text) {
    return text[0].toLocaleLowerCase() + text.substring(1, text.length);
  }

  //get look up table
  getLookUptable() {
    this.lookupColumnList = this.field.columnName;
    this.pageSize = 10000;
    this.pageNumber = 1;
    this.sortBy = "id";
    this.sortOrder = "false";
    let values=[];
    for(let i=0;i<this.lookupColumnList.length;i++)
    {
      values.push(this.lookupColumnList[i].columnName);
    }
    this.getLookUpTableData(this.pageSize, this.pageNumber, this.sortBy, this.sortOrder, { tableId: this.field.lookupTableId, local: null,columnDetails:values });

  }

  getLookUpTableData(pageSize, pageNumber, sortBy, sortOrder, filterBy) {
    this._lookupTableService.getLookUpTableList(pageSize, pageNumber, sortBy, sortOrder, filterBy)
      .subscribe(res => {
        this.tableData = res;
      });
  }



}
