using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Results;
using PIM.API.Linq;
using PIM.Data;
using PIM.API.Logging;
using PIM.Data.Enums;
using PIM.Data.Users;
using PIM.Data.MasterData;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class OrganizationController : AbstractController
    {

        [HttpGet]
        public IHttpActionResult Get()
        {
            var org = Repository.GetAll<Organization>()
                .Select(o=>new {
                    o.Id,
                    o.ShortName,
                    o.LongName,
                    Logo = o.Logo==null? "assets/images/Saint-gobain_small.png":o.Logo,
                    o.IsCatalog,
                    o.IsContainor,
                    o.IsEnvironment,
                    o.CreatedBy,
                    o.CreatedDate,
                    o.ParentId
                    
                });
            return Ok(org);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var org = Repository.FindBy<Organization>(u => u.Id==id)
                .Select(o=>new {
                    o.Id,
                    o.ShortName,
                    o.LongName,
                    o.Logo,
                    o.IsCatalog,
                    o.IsContainor,
                    o.IsEnvironment,
                    o.CreatedBy,
                    o.CreatedDate,
                    o.ParentId
                }).SingleOrDefault();
            return Ok(org);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]Organization org)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<Organization>(u => u.ShortName == org.ShortName && u.ParentId==org.ParentId).Any())
            {
                var warningMessage = "The Organization Name \"" + org.ShortName + "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("org.name", warningMessage);
                return BadRequest(ModelState);
            }

            org.CreatedBy = principal.Username;
            org.CreatedDate = System.DateTime.Now;
            Repository.Add(org);
            Repository.Save();
            var message = "The Organization  \"" + org.ShortName+ "\" has been added";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult put([FromBody]Organization org)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);
            if (Repository.FindBy<Organization>(u => u.ShortName == org.ShortName && u.Id!= org.Id && u.ParentId != org.ParentId).Any())
            {
                var warningMessage = "The Organization Name \"" + org.ShortName + "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("org.name", warningMessage);
                return BadRequest(ModelState);
            }
             
            org.ModifiedBy = principal.Username;
            org.ModifiedDate = System.DateTime.Now;
            Repository.Update(org);
            Repository.Save();
            var message = "The Organization  \"" + org.ShortName + "\" has been updated";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var org = Repository.FindBy<Organization>(w => w.Id == id).SingleOrDefault();
            if (org == null)
            {
                return NotFound();
            }

            Repository.Delete(org);
            Repository.Save();
            var message = "The Organization \"" + org.ShortName + "\" has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

    }
}
