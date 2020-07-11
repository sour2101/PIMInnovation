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
    [AllowAnonymous]
    public class WorkflowController : AbstractController
    {
        [HttpGet]
        [RoleAuthorize(Roles.Administrator)]
        public IHttpActionResult Get()
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var filteredWorkflows = Repository.GetAll<Workflow>();

            var pagedWorkflow = filteredWorkflows.Select(u => new
            {
                u.Id,
                u.Name
            }).ToList();
            return Ok(pagedWorkflow);
        }

        [HttpGet]
        [RoleAuthorize(Roles.Administrator)]
        public IHttpActionResult Get(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var workflow = Repository.FindBy<Workflow>(u => u.Id == id)
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    Active = u.Active ? false : true,
                    WorkflowSteps = u.WorkflowSteps.Where(ws=> ws.RoleId == principal.RoleId).Select(ws=> new
                    {
                        ws.Id,
                        ws.StepName,
                        ws.WorkflowId
                    })
                }).SingleOrDefault();
           
            return Ok(workflow);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]Workflow workflow)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<Workflow>(u => u.Name == workflow.Name).Any())
            {
                var warningMessage = "The Workflow Name \"" + workflow.Name + "\" already exists";
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", workflow.Name);
                return BadRequest(ModelState);
            }

            workflow.CreatedBy = principal.Username;
            workflow.CreatedDate = DateTime.Now;
            Repository.Add(workflow);
            Repository.Save();
            var message = "The Workflow  \"" + workflow.Name + "\" has been added";
            Log.MonitoringLogger.Info(message);
            return Ok(workflow.Name);
        }

        [HttpPost]
        public IHttpActionResult Put([FromBody]Workflow workflow)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<Workflow>(u => u.Id != workflow.Id && u.Name == workflow.Name).Any())
            {
                var warningMessage = "The Workflow Name \"" + workflow.Name + "\" already exists";
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", workflow.Name);
                return BadRequest(ModelState);
            }

            workflow.ModifiedBy = principal.Username;
            workflow.ModifiedDate = DateTime.Now;
            Repository.Update(workflow);
            Repository.Save();
            var message = "The Workflow  \"" + workflow.Name + "\" has been added";
            Log.MonitoringLogger.Info(message);
            return Ok(workflow.Name);
        }
    }
}
