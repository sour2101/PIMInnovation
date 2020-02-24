import { FormGroup, FormArray } from '@angular/forms';
import { AppService } from 'src/app/app.service';

export class DynamicLookupFunction {

    public _form: FormGroup;
    public _lookupData;
    formArray;
    constructor() { }

    camalCase(text) {
        return text[0].toLocaleLowerCase() + text.substring(1, text.length);
    }

    lookupFunctions(functionName,colValue) {
        return this[functionName.toLocaleLowerCase() + "Change"](colValue);
    }

    brandnameChange(colValue) {        
    }

    functionalgroupChange(colValue) {
        // this.formArray = this._form.get("functionalNameValue") as FormArray;
        // const formGroup = this.formArray.controls[0] as FormGroup;
        // let tableData = formGroup.controls['lookupData'].value;
        // formGroup.controls['filterData'].patchValue(tableData.filter(f => f["functionalGroup"].toString().toLocaleLowerCase().includes(colValue.toLocaleLowerCase())));
    }

    functionalnameChange(colValue) {  
        this.updateProductGroup();      
    }

    updateProductGroup(){
        debugger;
        this.formArray = this._form.get("functionalGroup") as FormArray;
        let formGroupValue = this.formArray.controls[0] as FormGroup;
        let functionalgroupvalue = formGroupValue.value.name;

        this.formArray = this._form.get("functionalName") as FormArray;
        formGroupValue = this.formArray.controls[0] as FormGroup;
        let functionalNamevalue = formGroupValue.value.name;

        this.formArray = this._form.get("productGroup") as FormArray;
        const formGroup = this.formArray.controls[0] as FormGroup;
        let value=this._lookupData.filter(f => f["functionalGroup"].toString() == functionalgroupvalue && 
        f["functionalName"].toString() == functionalNamevalue);
        formGroup.controls['attributeValue'].patchValue(value[0].productGroup);

    }
}