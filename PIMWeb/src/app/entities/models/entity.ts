export class entity{
    id:number;
    shortName:string;
    longName:string;
    required:boolean;
    isCollection:boolean;
    dataType:string;
    displayType:string;
    lookupTableId:number;
    attributeValue:string;
    options:options[]
}

export class options{
    id:number;
    name:string;
}