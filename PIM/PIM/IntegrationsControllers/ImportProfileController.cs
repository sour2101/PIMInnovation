using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Results;

namespace PIM.API.IntegrationsControllers
{
    using Controllers;
    using Logging;
    using Data.Enums;
    using Data.Integrations;
    using Data.Users;
    using Linq;

    [AllowAnonymous]
    public class ImportProfileController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get(int? pageSize=null, int? pageNumber=null, string sortBy = null, string sortOrder = "false", string profileName = null)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var profiles = Repository.GetAll<ImportProfile>();
            if (!string.IsNullOrEmpty(profileName))
                profiles = profiles.Where(p => p.Name.Contains(profileName));

            var result = profiles.Select(p => new
            {
                p.Id,
                p.JobTypeId,
                p.Name,
                p.ModifiedDate
            }).ToPagedList(pageNumber, pageSize, sortBy, Convert.ToBoolean(sortOrder));

            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var profiles = Repository.GetAll<ImportProfile>()
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.JobTypeId
                });

            return Ok(profiles);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]ImportProfile profile)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<ImportProfile>(p => p.Name == profile.Name).Any())
            {
                var warningMessage = "The ProfileName \"" + profile.Name + "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }

            profile.CreatedBy = principal.Username;
            profile.CreatedDate = DateTime.Now;
            Repository.Add(profile);
            Repository.Save();
            var message = "The Profile \"" + profile.Name + "\" has been added";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
