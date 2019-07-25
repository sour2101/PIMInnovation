using PIM.API.Logging;
using PIM.Data.Enums;
using PIM.Data.MasterData;
using PIM.Data.Users;
using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Results;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class AttributeGroupController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var attrgroup = Repository.GetAll<AttributeGroup>()
                 .ToList();
            return Ok(attrgroup);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var attrgroup = Repository.GetAll<AttributeGroup>().Where(ag=>ag.AttrTypeId==id)
                .Select(ag=>new
                {
                    ag.Id,
                    label = ag.ShortName
                })
                .ToList();
            return Ok(attrgroup);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]AttributeGroup attrGroup)
        {
           

            if (Repository.FindBy<AttributeGroup>(ag=>ag.ShortName == attrGroup.ShortName).Any())
            {
                var warningMessage = "The Attribute Group \"" + attrGroup.ShortName + "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyexists", warningMessage);
                return BadRequest(ModelState);
            }
            var principal = (User)User.Identity;
            attrGroup.CreatedBy = principal.Username;
            attrGroup.CreatedDate = DateTime.Now;
            Repository.Add(attrGroup);
            Repository.Save();
            var message = "The Attribute Group \"" + attrGroup.ShortName + "\" has been added";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]AttributeGroup attrGroup)
        {
            Repository.Update(attrGroup);
            Repository.Save();
            var message = "The Attribute \"" + attrGroup.ShortName + "\" has been Updated";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var attrgroup = Repository.FindBy<AttributeGroup>(w => w.Id == id).SingleOrDefault();
            if (attrgroup == null)
                return NotFound();

            var attrList = Repository.GetAll<Data.MasterData.Attribute>().Where(a => a.AttributeGroupId == id).ToList();

            foreach (Data.MasterData.Attribute attr in attrList)
            {
                Repository.Delete(attr);
            }

            Repository.Delete(attrgroup);
            Repository.Save();
            var message = "The Attribute Group \"" + attrgroup.ShortName + "\" has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
