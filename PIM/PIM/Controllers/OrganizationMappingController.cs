namespace PIM.API.Controllers
{
    using Data.Enums;
    using Data.MasterData;
    using Data.Users;
    using Logging;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Web.Http;
    using System.Web.Http.Results;

    public class OrganizationMappingController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var result = Repository.GetAll<OrganizationMappings>().ToList();

            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult Get(int id,string mapping)
        {
            var elements = Repository.GetAll<Organization>().ToList();
            var child = elements.Where(e => e.Id == id).SingleOrDefault();
            var parents = FindAllParents(elements, child).ToList();
            parents.Add(child);


            var orgIds = parents.Select(p => p.Id).ToArray();
            
            var orgMap = Repository.GetAll<OrganizationMappings>().Where(om => orgIds.Contains(om.OrgId)).ToList();
            if (mapping == "role")
                orgMap = orgMap.Where(om => om.RoleId != null ).ToList();

            if (mapping == "attr")
                orgMap = orgMap.Where(om => om.AttributeId != null).ToList();

            if (mapping == "tax")
                orgMap = orgMap.Where(om => om.TaxonomyId != null).ToList();

            var result = orgMap.Select(om => new
                {
                    om.OrgId,
                    om.RoleId,
                    RoleName = om.RoleId==null?null: om.Role.Name,
                    om.AttributeId,
                    AttrName = om.AttributeId==null ?null : om.Attribute.ShortName
                }).ToList();               

            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]List<OrganizationMappings> orgmap)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);
            int orgId = orgmap[0].OrgId;
            List<OrganizationMappings> deleteMapping = new List<OrganizationMappings>();

            if (orgmap[0].RoleId != null)
            {
                deleteMapping = Repository.GetAll<OrganizationMappings>().Where(om => om.RoleId != null && om.OrgId == orgId).ToList();
                foreach (OrganizationMappings d in deleteMapping)
                {
                    if (!orgmap.Any(om => om.RoleId == d.RoleId && om.OrgId == d.OrgId))
                    {
                        Repository.Delete(d);
                    }
                }
            }

            if (orgmap[0].Attribute != null)
            {
                deleteMapping = Repository.GetAll<OrganizationMappings>().Where(om => om.AttributeId != null && om.OrgId == orgId).ToList();
                foreach (OrganizationMappings d in deleteMapping)
                {
                    if (!orgmap.Any(om => om.AttributeId == d.AttributeId && om.OrgId == d.OrgId))
                    {
                        Repository.Delete(d);
                    }
                }
            }

            Repository.Save();


            foreach (OrganizationMappings org in orgmap)
            {
                if (!Repository.GetAll<OrganizationMappings>().Any(om => om.OrgId == org.OrgId && om.RoleId == org.RoleId && om.AttributeId == org.AttributeId && om.TaxonomyId == org.TaxonomyId))
                {
                    Repository.Add(org);
                }
            }

            Repository.Save();
            var message = "The Organization  Mapping  has been done successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put(List<OrganizationMappings> orgmap)
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

        private IEnumerable<Organization> FindAllParents(List<Organization> all_data, Organization child)
        {
            var parent = all_data.FirstOrDefault(x => x.Id == child.ParentId);

            if (parent == null)
                return Enumerable.Empty<Organization>();

            return new[] { parent }.Concat(FindAllParents(all_data, parent));
        }



    }
}
