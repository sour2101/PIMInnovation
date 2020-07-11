using PIM.API.Logging;
using PIM.Data.MasterData;
using PIM.Data.Users;
using System;
using System.Linq;
using System.Web.Http;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class WorkflowStepsController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var principal = (User)User.Identity;

                var filteredWorkflows = Repository.GetAll<WorkflowSteps>();

                if (filteredWorkflows == null)
                {
                    return Ok();
                }

                var pagedWorkflow = filteredWorkflows
                    .Where(ws => ws.RoleId == principal.RoleId)
                    .Select(u => new
                    {
                        u.Id,
                        u.StepName
                    }).ToList();
                return Ok(pagedWorkflow);
            }
            catch (Exception ex)
            {
                Log.MonitoringLogger.Error("Error",ex);
                return Ok(ex.Message);
            }
            
        }
    }
}
