import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { LookupTableService } from 'src/app/lookup-tables/services/lookup-table.service';
import { DynamicLookupFunction } from '../../dynamic-functions/dynamicLookupFunction';
import { AppService } from 'src/app/app.service';

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
  pageSize: number;
  pageNumber: number;
  sortBy: string;
  sortOrder: string;
  show: boolean = false;
  _dynamicFunction: DynamicLookupFunction;
  constructor(
    private _lookupTableService: LookupTableService,
    private _pimService:AppService
  ) { }

  ngOnInit() {

    this.formArray = <FormArray>this.form.controls[this.field.shortName];
    this.getLookUptable();
    this.form.get(this.field.shortName+"Value").valueChanges.subscribe(val => this.onValueChange());
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
    let values = [];
    for (let i = 0; i < this.lookupColumnList.length; i++) {
      values.push(this.lookupColumnList[i].columnName);
    }
    this.getLookUpTableData(this.pageSize, this.pageNumber, this.sortBy, this.sortOrder, { tableId: this.field.lookupTableId, local: null });

  }

  getLookUpTableData(pageSize, pageNumber, sortBy, sortOrder, filterBy) {
    this._lookupTableService.getLookUpTableList(pageSize, pageNumber, sortBy, sortOrder, filterBy)
      .subscribe(res => {
        this.formArrayValue = <FormArray>this.form.controls[this.field.shortName+"Value"];
        const formGroupValue = this.formArrayValue.controls[0] as FormGroup;
        formGroupValue.controls['lookupData'].patchValue(res);
        formGroupValue.controls['filterData'].patchValue(res);
        this.tableData = res;
      });
  }

  toggle(e, arrayName) {
   // this.filterData = this.tableData;
    this.show = !this.show;
  }

  onRowSelect(e) {
    this._dynamicFunction =new DynamicLookupFunction();
    this.formArray = this.form.get(this.field.shortName) as FormArray;
    const formGroup = this.formArray.controls[0] as FormGroup;
    let columnName = this.lookupColumnList.length > 1 ? this.field.shortName : this.lookupColumnList[0].columnName;
    formGroup.controls['name'].patchValue(e.data[this.camalCase(columnName)]);
    formGroup.controls['attributeValue'].patchValue(e.data['id']);
    this._dynamicFunction._form = this.form;
    this._dynamicFunction.lookupFunctions(this.field.shortName,e.data[this.camalCase(columnName)]);
    this.show = !this.show;
  }

  onSearch(e) {
    this.getFilterData(e);
    this.show = true;
  }

  getFilterData(value) {
    let columnName = this.lookupColumnList.length > 1 ? this.field.shortName : this.lookupColumnList[0].columnName;
    //this.filterData = this.tableData.filter(f => f[this.camalCase(columnName)].toString().toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    this.formArrayValue = <FormArray>this.form.controls[this.field.shortName+"Value"];
    const formGroupValue = this.formArrayValue.controls[0] as FormGroup;
    formGroupValue.controls['filterData'].patchValue( this.tableData.filter(f => f[this.camalCase(columnName)].toString().toLocaleLowerCase().includes(value.toLocaleLowerCase())));
  }

  onValueChange()  {
    this.formArrayValue = <FormArray>this.form.controls[this.field.shortName+"Value"];
    const formGroupValue = this.formArrayValue.controls[0] as FormGroup;
    this.filterData = formGroupValue.controls['filterData'].value;
  }



}
