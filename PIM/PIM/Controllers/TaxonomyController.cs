using PIM.API.Logging;
using PIM.Data.Enums;
using PIM.Data.Organiations;
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
    public class TaxonomyController : AbstractController
    {

        [HttpGet]
        public IHttpActionResult Get(){

            var result = Repository.GetAll<Taxonomy>();

           var taxonomy = result.ToList<Taxonomy>();

            var tax = taxonomy
                .Where(t => t.ParentId == null)
                .Select(t => new Taxonomy
                {
                    Id = t.Id,
                    Name = t.Name,
                    ParentId = t.ParentId,
                    Children = GetChildren(taxonomy, t.Id)
                })
                .ToList();

            return Ok(tax);
        }

        private List<Taxonomy> GetChildren(List<Taxonomy> children, int parentId)
        {
            return children
                .Where(c => c.ParentId == parentId)
                .Select(c => new Taxonomy
                {
                    Id = c.Id,
                    Name = c.Name,
                    ParentId = c.ParentId,
                    Children = GetChildren(children, c.Id)
                }).ToList();
        }

        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            var result = Repository.FindBy<Taxonomy>(t => t.Id == id)
                .Select(t =>new {
                    t.Id,
                    t.Name,
                    t.ParentId
                })
                .SingleOrDefault();
            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]Taxonomy data)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<Taxonomy>(u => u.Name == data.Name).Any())
            {
                var warningMessage = "The taxonomy \"" + data.Name+ "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }

            data.CreatedBy = principal.Username;
            data.CreatedDate = DateTime.Now;

            Repository.Add(data);
            Repository.Save();
            var message = "The Taxonomy \"" + data.Name + "\" inserted successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }


        [HttpPut]
        public IHttpActionResult Put([FromBody]Taxonomy data)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            if (Repository.FindBy<Taxonomy>(u => u.Id!=data.Id && u.Name == data.Name ).Any())
            {
                var warningMessage = "The taxonomy \"" + data.Name + "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }

            data.ModifiedBy = principal.Username;
            data.ModifiedDate = DateTime.Now;
            Repository.Update(data);
            Repository.Save();
            var message = "The Taxonomy \"" + data.Name + "\" inserted successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var tax = Repository.FindBy<Taxonomy>(t => t.Id == id).SingleOrDefault();

            Repository.Delete(tax);
            Repository.Save();
            var message = "The Taxonomy \"" + tax.Name+ "\" has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
