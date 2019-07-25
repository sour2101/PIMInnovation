

export class GlobalVariable {
    
    public static apiRootUrl = 'http://localhost/pimapi/api/';//'http://localhost:54450/api/';//
    public static loginUrl = "http://localhost:4200/login";
    public static loc : any = [];
    public static currentUser :any=[];
    public static CasLoginUrl ='https://uat.websso.saint-gobain.com/cas/login';
    public static CasLogoutUrl = 'https://uat.websso.saint-gobain.com/cas/logout';
    public static dataLocal :string='1';
    public static uiLocal:string='1';
    public static org_id:string;
    public static cat_id:string;
    public static logout_Url=GlobalVariable.apiRootUrl+'logout';
    public static resource_url = GlobalVariable.apiRootUrl+'resources';
    public static user_url = GlobalVariable.apiRootUrl+'users';
   
    public static authentication_url = GlobalVariable.apiRootUrl+'authenticate';
    public static sso_url = GlobalVariable.apiRootUrl+'sso';
    public static language_url = GlobalVariable.apiRootUrl+'languages';
    public static role_url = GlobalVariable.apiRootUrl+'roles';
    public static manager_url = GlobalVariable.apiRootUrl+'managers';
    public static Category_url  =GlobalVariable.apiRootUrl+'categories';
    public static Org_url  =GlobalVariable.apiRootUrl+'enviroment';
    public static Catalog_url  =GlobalVariable.apiRootUrl+'catalogs';
    public static Taxonomy_url  =GlobalVariable.apiRootUrl+'taxonomy';
    public static TimeZone_url  =GlobalVariable.apiRootUrl+'timeZone';
    public static userPref_url  =GlobalVariable.apiRootUrl+'UserPrefrences';
    public static ldap_url  =GlobalVariable.apiRootUrl+'SearchUser';
    public static login_url  =GlobalVariable.apiRootUrl+'login';
    public static passwordRecovery_url  =GlobalVariable.apiRootUrl+'passwordRecovery';
    public static changePassword_url  =GlobalVariable.apiRootUrl+'changePassword';
    public static file_url  =GlobalVariable.apiRootUrl+'file';
    public static filedownload_url  =GlobalVariable.apiRootUrl+'exportdatamodel';
    public static getSheet_url  =GlobalVariable.apiRootUrl+'getSheets';
}