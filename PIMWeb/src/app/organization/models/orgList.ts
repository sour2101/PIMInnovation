export class OrgList{
   id:number;
   parentId:number;
   shortName:string;
   longName:string;
   label:string;
   logo:string;
   children:OrgList[];
}

export class Organization{
   id:number;
   shortName:string;
   longName:string;
   logo:string;
   parentId:number;
   isCatalog:boolean;
   isEnvironment:boolean;
   isContainor:boolean;
   createdBy:string;
   createdDate:Date;
}