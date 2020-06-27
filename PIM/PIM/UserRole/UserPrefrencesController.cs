namespace PIM.API.UserRole
{
    using System.Linq;
    using System.Web.Http;
    //using PIM.API.HttpFilters.Roles;
    using Logging;
    using Data.Users;
    using System;
    using Controllers;

    [AllowAnonymous]
    public class UserPrefrencesController : AbstractController
    {

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var userpreList = Repository.GetAll<UserPreferences>().Where(up => up.UserId == id)
                .Select(up => new {
                    up.RoleId,
                    up.Taxonomy,
                    up.TimeZone,
                    up.LocaleId,
                    up.UserId,
                    up.OrganizationId,
                    up.Users.Username,
                    OrganizationName = up.Organization.LongName
                }).SingleOrDefault();

            return Ok(userpreList);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]UserPreferences user)
        {
            var principal = (User)User.Identity;

            user.CreatedBy = principal.Username;
            user.CreatedDate = DateTime.Now;
            Repository.Add(user);
            Repository.Save();
            var message = "The User  has been Added";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]UserPreferences user)
        {
            var principal = (User)User.Identity;

            user.ModifiedBy = principal.Username;
            user.ModifiedDate = DateTime.Now;
            Repository.Update(user);
            Repository.Save();
            var message = "The User Preferences has been Updated";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
