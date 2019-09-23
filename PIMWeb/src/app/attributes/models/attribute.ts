import { attributeLookups } from './attributeLookups';
import { attributeDropDowns } from './attributeDropDown';

export class Attribute {
    id: number;
    shortName: string;
    longName: string;
    attributeGroupId: number;
    dataType: string;
    displayType: string;
    dataTypeId: number;
    displayTypeId: number;
    required: boolean;
    isActive: boolean;
    isLocalizable: boolean;
    isCollection:boolean;
    showAtCreation: boolean;
    lookupTableId: number;
    selectedLookupColumns:[];
    attributeLookups: attributeLookups[];
    attributeDropDowns:attributeDropDowns[];
    createdBy: number;
    createdDate: Date;
}