
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
   

    public class IntegrationJobController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get(int? pageSize = null, int? pageNumber = null, string sortBy = null, string sortOrder = "false", string profileName = null,string statusName=null)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var jobs = Repository.GetAll<IntegrationJob>();
            if (!string.IsNullOrEmpty(profileName))
                jobs = jobs.Where(p => p.ImportProfiles.JobType.Name.Contains(profileName));
            if (!string.IsNullOrEmpty(statusName))
                jobs = jobs.Where(p => p.IntegrationStatus.Name.Contains(statusName));

            var result = jobs.Select(j => new
            {
                j.Id,
                j.Name,
                StatusName = j.IntegrationStatus.Name,
                j.Description,
                ProfileName = j.ImportProfiles.Name,
                j.CreatedBy,
                j.CreatedDate,
            }).ToPagedList(pageNumber, pageSize, sortBy, Convert.ToBoolean(sortOrder));

            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var profiles = Repository.GetAll<IntegrationJob>()
                .Select(p => new
                {
                    p.Id,
                    p.Name
                });

            return Ok(profiles);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var job = Repository.FindBy<IntegrationJob>(w => w.Id == id).SingleOrDefault();
            if (job == null)
            {
                return NotFound();
            }

            Repository.Delete(job);
            Repository.Save();
            var message = "The Job \"" + job.Name + "\" has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
