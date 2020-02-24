import { FormGroup, FormArray } from '@angular/forms';
import { AppService } from 'src/app/app.service';

export class DynamicLoadLookup {

    public _form: FormGroup;
    formArray;
    public _where:string=null;
    constructor() { }

    

    camalCase(text) {
        return text[0].toLocaleLowerCase() + text.substring(1, text.length);
    }

    loadlookup(lookupName:string) {
        // let fn = window[lookupName.toLocaleLowerCase()];
        // if (typeof fn === 'function') 
            return this[lookupName.toLocaleLowerCase()]();
    }

    brandname(){}

    functionalgroup(){}

    functionalname(){
        this.formArray = this._form.get("functionalGroup") as FormArray;
        const formGroup = this.formArray.controls[0] as FormGroup;
        this._where="functionalGroup@'"+ formGroup.controls['name'].value+"'";
    }
}