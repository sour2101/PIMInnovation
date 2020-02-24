import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { LookupTableService } from 'src/app/lookup-tables/services/lookup-table.service';
import { DynamicLookupFunction } from '../../dynamic-functions/dynamicLookupFunction';

import { AppService } from 'src/app/app.service';
import { DynamicLoadLookup } from '../../dynamic-functions/dynamicLoadLookup';

@Component({
  selector: 'lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['../field-builder/field-builder.component.css']
})
export class LookupComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: FormGroup;

  formArray;
  formArrayValue;
  functionName: string;
  lookupColumnList = [];
  tableData: any[];
  filterData: any[];
  show: boolean = false;
  _dynamicFunction: DynamicLookupFunction;
  _dynamicLoadLookup:DynamicLoadLookup;

  constructor(
    private _lookupTableService: LookupTableService,
    private _pimService:AppService
  ) { }

  ngOnInit() {
    this.formArray = <FormArray>this.form.controls[this.field.shortName];
  }

  camalCase(text) {
    return text[0].toLocaleLowerCase() + text.substring(1, text.length);
  }

  //get look up table
  getLookUptable(whereClause) {
    this.lookupColumnList = this.field.columnName;
    let values = [];
    for (let i = 0; i < this.lookupColumnList.length; i++) {
      values.push(this.lookupColumnList[i].columnName);
    }
    this.getLookUpTableData({ tableId: this.field.lookupTableId, local: null,where:whereClause });

  }

  getLookUpTableData(filterBy) {
    this._lookupTableService.getDynamicLookUpTable(filterBy)
      .subscribe(res => {
        this.tableData = res;
        this.filterData=res;
      });
  }

  toggle(e, arrayName) {
   this.show = !this.show;
   this._dynamicLoadLookup =new DynamicLoadLookup();
   if(this.show){
    this._dynamicLoadLookup._form = this.form;
    this._dynamicLoadLookup.loadlookup(this.field.shortName)
   }
    
    this.getLookUptable(this._dynamicLoadLookup._where);
  }

  onRowSelect(e) {
    this._dynamicFunction =new DynamicLookupFunction();
    this.formArray = this.form.get(this.field.shortName) as FormArray;
    const formGroup = this.formArray.controls[0] as FormGroup;

    let columnName = this.lookupColumnList.length > 1 ? this.field.shortName : this.lookupColumnList[0].columnName;
    formGroup.controls['name'].patchValue(e.data[this.camalCase(columnName)]);
    formGroup.controls['attributeValue'].patchValue(e.data['id']);
    this._dynamicFunction._form = this.form;
    this._dynamicFunction._lookupData =this.tableData;
    this._dynamicFunction.lookupFunctions(this.field.shortName,e.data[this.camalCase(columnName)]);
    this.show = false;
  }

  onSearch(e) {
    this.getFilterData(e);
    this.show = true;
  }

  getFilterData(value) {
    let columnName = this.lookupColumnList.length > 1 ? this.field.shortName : this.lookupColumnList[0].columnName;
    this.filterData = this.tableData.filter(f => f[this.camalCase(columnName)].toString().toLocaleLowerCase().includes(value.toLocaleLowerCase()));
  }

  onValueChange()  {
    this.filterData = this.tableData;
  }
  
}
