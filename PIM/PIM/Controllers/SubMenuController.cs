
namespace PIM.API.Controllers
{
    using Data.Enums;
    using Data.MasterData;
    using Data.Users;
    using Linq;
    using Logging;
    using System;
    using System.Linq;
    using System.Net;
    using System.Web.Http;
    using System.Web.Http.Results;

    public class SubMenuController : AbstractController
    {

        [HttpGet]        
        public IHttpActionResult Get(int parentId,int pageSize, int pageNumber, string sortBy = null, string sortOrder = "false",
            string name = null, string localeName = null)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var filterMenu = Repository.GetAll<MenuChildrens>().Where(c=>c.ParentId==parentId);
            if (!string.IsNullOrWhiteSpace(name))
                filterMenu = filterMenu.Where(u => u.Name.StartsWith(name));

            if (!string.IsNullOrWhiteSpace(localeName))
                filterMenu = filterMenu.Where(u => u.Locales.Name.StartsWith(localeName));

            var pagedUser = filterMenu.Select(u => new
            {
                u.Id,
                u.Name,
                u.Link,
                parentName =u.Parent.Name,
                u.ParentId,
                u.LanguageId,
                LocaleName =u.Locales.Name
            }).ToPagedList(pageNumber, pageSize, sortBy, Convert.ToBoolean(sortOrder));
            return Ok(pagedUser);
        }

        [HttpGet]
        
        public IHttpActionResult Get(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var menu = Repository.FindBy<MenuChildrens>(u => u.Id == id)
                .Select(m => new
                {
                    m.Id,
                    m.Name,
                    m.Link,
                    m.ParentId,
                    m.LanguageId
                }).SingleOrDefault();

            if (menu == null)
            {
                Log.MonitoringLogger.Warn("The SubMenuId \"" + id + "\" is not found");
                return NotFound();
            }
            return Ok(menu);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]MenuChildrens menu)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<MenuChildrens>(u => u.Name == menu.Name).Any())
            {
                var warningMessage = "The SubMenu \"" + menu.Name + "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }

          
            Repository.Add(menu);
            Repository.Save();
            var message = "The Menu \"" + menu.Name+ "\" inserted successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]MenuChildrens menu)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<MenuChildrens>(u => u.Id != menu.Id && u.Name == menu.Name).Any())
            {
                var warningMessage = "The Menu \"" + menu.Name+ "\" already exists";
                //Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }

          

            Repository.Update(menu);
            Repository.Save();
            var message = "The Menu \"" + menu.Name + "\" has been updated";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var menu = Repository.FindBy<MenuChildrens>(w => w.Id == id).SingleOrDefault();
            if (menu == null)
            {
                return NotFound();
            }

            

            Repository.Delete(menu);
            Repository.Save();
            var message = "The Menu \"" + menu.Name+ "\" has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }

}
