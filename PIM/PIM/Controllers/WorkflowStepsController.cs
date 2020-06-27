using PIM.API.HttpFilters;
using PIM.Data.MasterData;
using PIM.Data.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PIM.API.Controllers
{
    public class WorkflowStepsController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var principal = (User)User.Identity;
            
            var filteredWorkflows = Repository.GetAll<WorkflowSteps>().Where(ws=>ws.RoleId == principal.RoleId);

            var pagedWorkflow = filteredWorkflows.Select(u => new
            {
                u.Id,
                u.StepName
            }).ToList();
            return Ok(pagedWorkflow);
        }
    }
}
