namespace PIM.API.Controllers
{
    using Data.Enums;
    using Data.MasterData;
    using Data.Users;
    using Logging;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Web.Http;
    using System.Web.Http.Results;

    [AllowAnonymous]
    public class MenuRightsController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get(int localeId,int? id=null)
        {
            var menuLocale = Repository.GetAll<Menu>().Where(c => c.LanguageId == localeId).Select(b => b.Link).ToList();
            var menu = (Repository.GetAll<Menu>().Where(m => m.LanguageId == localeId)).Union(
                Repository.GetAll<Menu>().Where(m => m.LanguageId == 1 && 
                        !menuLocale.Contains(m.Link)));

            var result = menu.Select(m => new {
                    m.Id,
                   m.Name,
                   m.Link,
                   childrens = m.childrens.Select(c => new {
                       c.Id,
                       c.Name,
                       c.Link,
                       c.ParentId
                   }).ToList()
               }).ToList();
            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]List<MenuRights> menuRights)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);
            var roleId = menuRights[0].RoleId;
            var role = Repository.GetAll<Role>().Where(m => m.Id == roleId).SingleOrDefault();

            foreach (MenuRights mr in menuRights)
            {
                Repository.Add(mr);
            }

           
            Repository.Save();
            var message = "The Menu Rights inserted successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
