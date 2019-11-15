import { FormGroup, FormArray } from '@angular/forms';
import { AppService } from 'src/app/app.service';

export class DynamicLookupFunction {

    public _form: FormGroup;
    formArray;
    constructor() { }

    camalCase(text) {
        return text[0].toLocaleLowerCase() + text.substring(1, text.length);
    }

    lookupFunctions(functionName,colValue) {
        return this[functionName + "Change"](colValue);
    }

    BrandNameChange(colValue) {        
    }

    FunctionalGroupChange(colValue) {
        this.formArray = this._form.get("FunctionalNameValue") as FormArray;
        const formGroup = this.formArray.controls[0] as FormGroup;
        let tableData = formGroup.controls['lookupData'].value;
        formGroup.controls['filterData'].patchValue(tableData.filter(f => f["functionalGroup"].toString().toLocaleLowerCase().includes(colValue.toLocaleLowerCase())));
    }

    FunctionalNameChange(colValue) {        
    }
}