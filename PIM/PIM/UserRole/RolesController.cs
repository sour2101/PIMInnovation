namespace PIM.API.UserRole
{
    using System.Linq;
    using System.Net;
    using System.Web.Http;
    using System.Web.Http.Results;
    //using PIM.API.HttpFilters.Roles;
    using Linq;
    using Logging;
    using Data.Enums;
    using Data.Users;
    using System;
    using Controllers;

    [AllowAnonymous]
    public class RolesController : AbstractController
    {
        private IQueryable<Role> RestrictedActiveRoles
        {
            get
            {
                var roles = Repository.GetAll<Role>();
                return roles;
            }
        }

        [HttpGet]
        
        public IHttpActionResult Get() {

            var roles = RestrictedActiveRoles.Where(r => r.Active)
                .Select(r=>new {
                    r.Id,
                    r.Name
                }).ToList();
            return Ok(roles);
        }

        [HttpGet]
        public IHttpActionResult Get(int pageSize , int pageNumber , string sortBy = null, string sortOrder = "false",
            string name = null, string description = null)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var filteredRoles = RestrictedActiveRoles;

            if (!string.IsNullOrWhiteSpace(name))
                filteredRoles = filteredRoles.Where(r => r.Name.StartsWith(name));
                   

            var pagedUser = filteredRoles.Select(u => new
            {
                u.Id,
                u.Name
            }).ToList();
            return Ok(pagedUser);
        }

        [HttpGet]
         
        public IHttpActionResult Get(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);


            var role = Repository.FindBy<Role>(r =>  r.Id == id)
                .Select(r => new
                {
                    r.Id,
                    r.Name,
                    UserRights = r.UserRights.Select(p=> new { p.UserId }).ToList()
                }).SingleOrDefault();
            if (role == null)
            {
                Log.MonitoringLogger.Warn("The Role \"" + id + "\" is not found");
                return NotFound();
            }
            return Ok(role);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]Role role)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<Role>(r => r.Name == role.Name).Any())
            {
                var warningMessage = "The RoleName \"" + role.Name+ "\" already exists";
               // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("role.name", warningMessage);
                return BadRequest(ModelState);
            }

            role.Active = true;
            role.CreatedBy = principal.Username;
            role.CreatedDate = DateTime.Now;
            Repository.Add(role);
            Repository.Save();
            var message = "The Role \"" + role.Name + "\" has been added";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]Role role)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<Role>(r => r.Id != role.Id && r.Name == role.Name).Any())
            {
                var warningMessage = "The RoleName \"" + role.Name + "\" already exists";
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("role.name", warningMessage);
                return BadRequest(ModelState);
            }

            var userRights = Repository.FindBy<UserRights>(u => u.RoleId == role.Id).ToList();
            foreach (UserRights ur in userRights)
                Repository.Delete(ur);
            Repository.Save();

            foreach (UserRights ur in role.UserRights)
            {
                ur.RoleId = role.Id;
                Repository.Add(ur);
            }

            role.ModifiedBy = principal.Username;
            role.ModifiedDate = DateTime.Now;
            Repository.Update(role);
            Repository.Save();
            var message = "The Role \"" + role.Name + "\" has been updated";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var role = Repository.FindBy<Role>(w => w.Id == id).SingleOrDefault();
            if (role == null)
            {
                return NotFound();
            } 

            foreach (UserRights ur in role.UserRights.ToList())
            {
                Repository.Delete(ur);
            }

            Repository.Delete(role);
            Repository.Save();
            var message = "The Role \"" + role.Name + "\" has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
