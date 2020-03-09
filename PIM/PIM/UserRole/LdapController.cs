
namespace PIM.API.UserRole
{
    using Models;
    using Logging;
    using System.Web.Http;
    using Controllers;

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
