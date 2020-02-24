import { attributeLookups } from './attributeLookups';
import { attributeDropDowns } from './attributeDropDown';
import { attributeUoms } from './attributeUom';
import { attributeBRs } from './attributeBRs';
export class Attribute {
    id: number=0;
    shortName: string="";
    longName: string="";
    attributeGroupId: number=0;
    dataType: string="";
    displayType: string="";
    dataTypeId: number=0;
    displayTypeId: number=0;
    required: boolean=false;
    isActive: boolean=false;
    isLocalizable: boolean=false;
    isCollection: boolean=false;
    showAtCreation: boolean=false;
    lookupTableId: number=0;
    uomTypeId:number=0;
    attributeLookups: attributeLookups[];
    attributeDropDowns: attributeDropDowns[];
    // attributeUoms:attributeUoms[];
    attributeBRs: attributeBRs[];
    createdBy: number;
    createdDate: Date;
}