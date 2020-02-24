using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Results;
//using PIM.API.HttpFilters.Roles;
using PIM.API.Linq;
using PIM.Data;
using PIM.API.Logging;
using PIM.Data.Enums;
using PIM.Data.Users;
using PIM.API.HttpFilters;
using System;
using PIM.API.Providers;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class UsersController : AbstractController
    {

        private IPasswordManagerProvider passwordManagerProvider;
        protected IPasswordManagerProvider PasswordManagerProvider => passwordManagerProvider ?? (passwordManagerProvider = new PasswordManagerProvider());

        private IQueryable<User> RestrictedActiveUsers
        {
            get
            {
                var users = Repository.GetAll<User>().Where(u=> u.Active);
                //var principal = (User)User.Identity;
                ////if (principal.Role.Name == Roles.Administrator.ToString())
                ////    return users;

                //var plants = Repository.FindBy<UserRights>(u => u.UserId == principal.Id).Select(u => u.RoleId).ToArray();

                //users = users.Where(u => u.UserRights.Any(ur => plants.Contains(ur.RoleId)));
                return users;
               
            }
        }

        [HttpGet]
        public IHttpActionResult Get() {
            var users = RestrictedActiveUsers.Where(r => r.Active)
               .Select(r => new {
                   r.Id,
                   r.Username
               }).ToList();
            return Ok(users);
        }


        [HttpGet]
        [RoleAuthorize(Roles.Administrator)]
        public IHttpActionResult Get(int pageSize, int pageNumber, string sortBy = null, string sortOrder = "false",
            string username = null, string firstname = null, string lastname = null)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur=>ur.RoleId==(int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var filteredUsers = RestrictedActiveUsers;

            if (!string.IsNullOrWhiteSpace(username))
                filteredUsers = filteredUsers.Where(u => u.Username.StartsWith(username));
            if (!string.IsNullOrWhiteSpace(lastname))
                filteredUsers = filteredUsers.Where(u => u.Lastname.StartsWith(lastname));
            if (!string.IsNullOrWhiteSpace(firstname))
                filteredUsers = filteredUsers.Where(u => u.Firstname.StartsWith(firstname));
                   

            var pagedUser = filteredUsers.Select(u => new
            {
                u.Id,
                u.Firstname,
                u.Lastname,
                u.Email,
                u.Disabled,
                u.Username,
                LanguageName = u.Languages.Name,                 
                u.ManagerId,
                Active = u.Active?false:true
            }).ToPagedList(pageNumber, pageSize, sortBy, Convert.ToBoolean(sortOrder));
            return Ok(pagedUser);
        }

        [HttpGet]
        [RoleAuthorize(Roles.Administrator)]
        public IHttpActionResult Get(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var user = Repository.FindBy<User>(u =>  u.Id == id)
                .Select(u => new
                {
                    u.Id,
                    Sso = u.Sso ?1:0,
                    u.Firstname,
                    u.Lastname,
                    u.Email,
                    u.Disabled,
                    u.Username,
                    u.Password,                    
                    u.LanguageId,
                    u.ManagerId,
                    u.Active,
                    UserRights =u.UserRights.Select(p=> new { id  = p.RoleId,p.Roles.Name }).ToList()
                }).SingleOrDefault();
            if (user == null)
            {
                Log.MonitoringLogger.Warn("The UserId \"" + id + "\" is not found");
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]User user)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);
            
            if (Repository.FindBy<User>(u => u.Username == user.Username).Any())
            {
                var warningMessage = "The username \"" + user.Username + "\" already exists";
               // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }

            user.Active = true;
            user.Password = PasswordManagerProvider.Hash("UserPIM@123");
            Repository.Add(user);
            Repository.Save();
            var message = "The username \"" + user.Username + "\" inserted successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]User user)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<User>(u => u.Id != user.Id && u.Username == user.Username).Any())
            {
                var warningMessage = "The username \"" + user.Username + "\" already exists";
                //Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }

            var userRights = Repository.FindBy<UserRights>(u => u.UserId == user.Id).ToList();
            foreach(UserRights ur in userRights)
                    Repository.Delete(ur);
            Repository.Save();

            foreach (UserRights ur in user.UserRights)
            {
                ur.UserId = user.Id;
                Repository.Add(ur);
            }

            if(!string.IsNullOrEmpty(user.Password))
                user.Password = PasswordManagerProvider.Hash(user.Password);

            Repository.Update(user);
            Repository.Save();
            var message = "The user \"" + user.Username + "\" has been updated";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var user = Repository.FindBy<User>(w => w.Id == id).SingleOrDefault();
            if (user == null)
            {
                return NotFound();
            }           

            var token = Repository.FindBy<Token>(t => t.UserId == user.Id).SingleOrDefault();
            if (token != null)
                Repository.Delete(token);

            foreach (UserRights ur in user.UserRights.ToList())
            {
                Repository.Delete(ur);
            }

            Repository.Delete(user);
            Repository.Save();
            var message = "The user \"" + user.Username + "\" has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
