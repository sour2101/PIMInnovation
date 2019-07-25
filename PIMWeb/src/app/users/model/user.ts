export class User{
    id:number;
    firstname:string;
    lastname:string;
    email:string;
    active:boolean;
    username:string;
    password:string;
    managerId:number;
    languageId:number;
    sso:boolean;
    disabled:boolean;
    userRights:UserRights;
}

export  class UserRights{
    roleId:number;
    userId:number;
}