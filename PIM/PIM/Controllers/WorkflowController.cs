using PIM.API.HttpFilters;
using PIM.API.Linq;
using PIM.API.Logging;
using PIM.Data.Enums;
using PIM.Data.MasterData;
using PIM.Data.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace PIM.API.Controllers
{
    public class WorkflowController : AbstractController
    {
        [HttpGet]
        [RoleAuthorize(Roles.Administrator)]
        public IHttpActionResult Get(int pageSize, int pageNumber, string sortBy = null, string sortOrder = "false",
            string name = null, string status = null)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var filteredWorkflows = Repository.GetAll<Workflow>();

            if (!string.IsNullOrWhiteSpace(name))
                filteredWorkflows = filteredWorkflows.Where(u => u.Name.StartsWith(name));
            


            var pagedWorkflow = filteredWorkflows.Select(u => new
            {
                u.Id,
                u.Name,
                Active = u.Active ? false : true
            }).ToPagedList(pageNumber, pageSize, sortBy, Convert.ToBoolean(sortOrder));
            return Ok(pagedWorkflow);
        }

        [HttpGet]
        [RoleAuthorize(Roles.Administrator)]
        public IHttpActionResult Get(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var user = Repository.FindBy<User>(u => u.Id == id)
                .Select(u => new
                {
                    u.Id,
                    Sso = u.Sso ? "1" : "0",
                    u.Firstname,
                    u.Lastname,
                    u.Email,
                    u.Disabled,
                    u.Password,
                    u.Username,
                    u.LanguageId,
                    u.ManagerId,
                    u.Active,
                    UserRights = u.UserRights.Select(p => new { p.RoleId }).ToList()
                }).SingleOrDefault();
            if (user == null)
            {
                Log.MonitoringLogger.Warn("The UserId \"" + id + "\" is not found");
                return NotFound();
            }
            return Ok(user);
        }
    }
}
