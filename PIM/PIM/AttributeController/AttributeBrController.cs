namespace PIM.API.AttributeController
{
    using System.Linq;
    using System.Net;
    using System.Web.Http;
    using System.Web.Http.Results;
    //using PIM.API.HttpFilters.Roles;
    using Linq;
    using Logging;
    using Data.Enums;
    using Data.Users;
    using System;
    using Data.Attributes;
    using Controllers;

    [AllowAnonymous]
    public class AttributeBrController : AbstractController
    {
        [HttpGet] 
        public IHttpActionResult Get(int? atributeId)
        {
            var attribute = Repository.GetAll<AttributeBRs>().Where(abr=>abr.AttributeId== atributeId)
                .Select(a => new
                {
                    a.Id,
                    a.Name,
                    a.Description,
                    a.AttributeId,
                    a.SortOrder
                }).ToList();

            return Ok(attribute);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var attribute = Repository.FindBy<AttributeBRs>(abr => abr.Id == id)
                .Select(a => new
                {
                    a.Id,
                    a.Name,
                    a.Description,
                    a.AttributeId,
                    a.SortOrder
                }).SingleOrDefault();

            return Ok(attribute);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]AttributeBRs attr)
        {
            if (Repository.FindBy<AttributeBRs>(u => u.Name == attr.Name).Any())
            {
                var warningMessage = "The Attribute \"" + attr.Name + "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyexits", warningMessage);
                return BadRequest(ModelState);
            }
           
            Repository.Add(attr);
            Repository.Save();
            var message = "The Attribute \"" + attr.Name + "\" has been added";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]AttributeBRs attr)
        {
            var principal = (User)User.Identity;            

            Repository.Update(attr);
            Repository.Save();
            var message = "The Attribute \"" + attr.Name + "\" has been Updated";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var attrBR = Repository.FindBy<AttributeBRs>(w => w.Id == id).SingleOrDefault();
            if (attrBR == null)
            {
                return NotFound();
            }

            Repository.Delete(attrBR);
            Repository.Save();
            var message = "The BR Attribute \"" + attrBR.Name + "\" has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

    }
}
