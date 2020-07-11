using System.Linq;
using System.Web.Http;
using PIM.Data.Users;
using PIM.Data.Organizations;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class DashboardController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var principle = (User)User.Identity;

            var orgList = Repository.GetAll<UserOrgMappings>()
                .Where(uo => uo.UserId == principle.Token.UserId).Select(uo => uo.OrgId)
                .ToArray();

            var result = Repository.GetAll<Organization>()
                .Select(c=> new
                {
                    userCount = c.UserOrgMappings.Where(uo=> orgList.Contains(uo.OrgId)).Count(),
                    roleCount = c.RoleOrgMappings.Where(uo => orgList.Contains(uo.OrgId)).Count(),
                    taxCount = c.TaxonomyOrgMappings.Where(uo => orgList.Contains(uo.OrgId)).Count(),
                    attrCount = c.AttributeOrgMappings.Where(uo => orgList.Contains(uo.OrgId)).Count(),
                    c.Id
                })
                .GroupBy(c=> c.Id)
                .ToList();

            return Ok(result);
        }
    }
}
