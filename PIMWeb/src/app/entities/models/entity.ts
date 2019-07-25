export class entity{
    id:number;
    shortName:string;
    longName:string;
    required:boolean;
    dataType:string;
    displayType:string;
    attributeValue:string;
    options:options[]
}

export class options{
    id:number;
    name:string;
}