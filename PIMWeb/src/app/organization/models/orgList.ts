export class OrgList{
   id:number;
   parentId:number;
   shortName:string;
   longName:string;
   label:string;
   children:OrgList[];
}

export class Organization{
   id:number;
   shortName:string;
   longName:string;
   parentId:number;
   isCatalog:boolean;
   isEnvironment:boolean;
   isContainor:boolean;
   createdBy:number;
   createdDate:Date;
}