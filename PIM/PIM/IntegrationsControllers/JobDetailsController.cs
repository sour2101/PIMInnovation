namespace PIM.API.IntegrationsControllers
{
    using Controllers;
    using Data.Enums;
    using Data.Integrations;
    using Data.Users;
    using Linq;
    using System;
    using System.Linq;
    using System.Net;
    using System.Web.Http;
    using System.Web.Http.Results;

    [AllowAnonymous]
    public class JobDetailsController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get(int integrationID, int? pageSize = null, int? pageNumber = null, string sortBy = null, string sortOrder = "false", string sheetName = null, string entityName = null,string code=null,string errorMessage=null)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var job = Repository.GetAll<JobDetails>().Where(j=>j.IntegrationId== integrationID);
            if (!string.IsNullOrEmpty(sheetName))
                job = job.Where(j => j.SheetName.Contains(sheetName));
            if (!string.IsNullOrEmpty(entityName))
                job = job.Where(j => j.EntityName.Contains(entityName));
            if (!string.IsNullOrEmpty(code))
                job = job.Where(j => j.Code.Contains(code));
            if (!string.IsNullOrEmpty(errorMessage))
                job = job.Where(j => j.ErrorMessage.Contains(errorMessage));

            var result = job.Select(m => new {
                m.Id,
                m.SheetName,
                m.Code,
                m.EntityName,
                m.ErrorMessage,
                m.RowNumber
            }).ToPagedList(pageNumber, pageSize, sortBy, Convert.ToBoolean(sortOrder));

            return Ok(result);
        }
    }
}
