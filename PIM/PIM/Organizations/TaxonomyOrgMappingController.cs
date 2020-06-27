namespace PIM.API.Organizations
{
    using Controllers;
    using Data.Enums;
    using Data.MasterData;
    using Data.Organizations;
    using Data.Users;
    using Linq;
    using Logging;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Web.Http;
    using System.Web.Http.Results;

    public class TaxonomyOrgMappingController : AbstractController
    {

        [HttpGet]
        public IHttpActionResult Get()
        {
            var result = Repository.GetAll<TaxonomyOrgMapping>().ToList();

            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var elements = Repository.GetAll<Organization>().ToList();
            var child = elements.Where(e => e.Id == id).SingleOrDefault();
            FindAllParents findParents = new FindAllParents();
            var parents = findParents.Organizations(elements, child).ToList();
            parents.Add(child);

            var orgIds = parents.Select(p => p.Id).ToArray();

            var result = Repository.GetAll<TaxonomyOrgMapping>().Where(om => orgIds.Contains(om.OrgId));

            return Ok(result.Select(om => new
            {
                Id = om.TaxonomyId,
                Name = om.Taxomony.Name
            }).ToList());

        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]List<TaxonomyOrgMapping> orgmap)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);
            int orgId = orgmap[0].OrgId;
            var taxOrg = Repository.GetAll<TaxonomyOrgMapping>().Where(or => or.OrgId == orgId).ToList();
            if (taxOrg != null)
            {
                var deleteMapping = Repository.GetAll<TaxonomyOrgMapping>()
                    .Where(o => o.OrgId == orgId).ToList().Intersect(orgmap).ToList();

                foreach (TaxonomyOrgMapping d in deleteMapping)
                {
                    Repository.Delete(d);
                    Repository.Save();
                }
            }

            foreach (TaxonomyOrgMapping or in orgmap)
            {
                if (!taxOrg.Any(o => o.OrgId == or.OrgId && o.TaxonomyId == or.TaxonomyId))
                {
                    Repository.Add(or);
                }
            }

            Repository.Save();
            var message = "The Organization  Mapping  has been done successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put(List<TaxonomyOrgMapping> orgmap)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);


            Repository.Add(orgmap);
            Repository.Save();
            var message = "The Organization  Mapping  has been done successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        


    }
}
