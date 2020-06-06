
namespace PIM.API.AttributeController
{
    using Logging;
    using Data.Attributes;
    using Data.Enums;
    using Data.Users;
    using System;
    using System.Linq;
    using System.Net;
    using System.Web.Http;
    using System.Web.Http.Results;
    using Controllers;

    [AllowAnonymous]
    public class AttributeGroupController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var attrgroup = Repository.GetAll<AttributeGroup>()
                 .ToList().OrderBy(ag => ag.Name); 
            return Ok(attrgroup);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var attrgroup = Repository.GetAll<AttributeGroup>().Where(ag=>ag.AttrTypeId==id)
                .Select(ag=>new
                {
                    ag.Id,
                    label = ag.Name
                })
                .ToList().OrderBy(ag=>ag.label);
            return Ok(attrgroup);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]AttributeGroup attrGroup)
        {
           

            if (Repository.FindBy<AttributeGroup>(ag=>ag.Name == attrGroup.Name).Any())
            {
                var warningMessage = "The Attribute Group \"" + attrGroup.Name + "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }
            var principal = (User)User.Identity;
            attrGroup.CreatedBy = principal.Username;
            attrGroup.CreatedDate = DateTime.Now;
            Repository.Add(attrGroup);
            Repository.Save();
            var message = "The Attribute Group \"" + attrGroup.Name + "\" has been added";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]AttributeGroup attrGroup)
        {
            Repository.Update(attrGroup);
            Repository.Save();
            var message = "The Attribute \"" + attrGroup.Name + "\" has been Updated";
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

            var attrList = Repository.GetAll<Data.Attributes.Attribute>().Where(a => a.AttributeGroupId == id).ToList();

            foreach (Data.Attributes.Attribute attr in attrList)
            {
                Repository.Delete(attr);
            }

            Repository.Delete(attrgroup);
            Repository.Save();
            var message = "The Attribute Group \"" + attrgroup.Name + "\" has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
