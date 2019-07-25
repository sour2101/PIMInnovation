// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api:{
    endPoint:'http://localhost/pimapi/api'
  },
  CasLoginUrl :'https://uat.websso.saint-gobain.com/cas/login',
  CasLogoutUrl : 'https://uat.websso.saint-gobain.com/cas/logout',
  loginUrl : "http://localhost/pim/login",
  authentication_url : 'authenticate',
  sso_url : 'sso',
  language_url : 'languages',
  role_url : 'roles',
  manager_url : 'managers',
  Category_url  :'categories',
  Org_url  :'enviroment',
  Catalog_url  :'catalogs',
  Taxonomy_url  :'taxonomy',
  TimeZone_url  :'timeZone',
  userPref_url  :'UserPrefrences',
  ldap_url  :'SearchUser',
  login_url  :'login',
  passwordRecovery_url  :'passwordRecovery',
  changePassword_url  :'changePassword',
  file_url  :'file',
  exportDataModel_url  :'dataModel',
  getSheet_url  :'getSheets',
  dataType_url:'dataType',
  displayType_url:'displayType',
  attributeType_url:'attributeTypes',
  attributeGroup_url:'attributeGroup'
};

//'http://localhost/pimapi/api',//'http://localhost:54450/api/'
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error',  // Included with Angular CLI.
