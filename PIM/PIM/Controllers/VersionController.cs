using System.Reflection;
using System.Web.Http;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class VersionController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(Assembly.GetExecutingAssembly().GetName().Version.ToString(3));
        }
    }
}