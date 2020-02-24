export class User{
    id:number = 0;
    firstname:string= "";
    lastname:string = "";
    email:string ="";
    active:boolean=true;
    username:string="";
    password:string="";
    managerId:number=0;
    languageId:number=0;
    sso:number=0;
    disabled:boolean=false;
    userRights:UserRights[]=[];
}

export  class UserRights{
    roleId:number;
    userId:number;
}