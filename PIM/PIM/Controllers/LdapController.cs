using PIM.API.Models;
using PIM.API.Logging;
using System.Web.Http;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class LdapController : AbstractController
    {
        // GET: Ldap
        [HttpPost]
        [Route("api/SearchUser")]
        public IHttpActionResult SearchLdapUser([FromBody] LdapModel model)
        {
             

            return Ok();
        }
    }
}
