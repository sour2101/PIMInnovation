using System.IO;
using System.Web;
using System.Web.Http;
using System.Xml.Serialization;
using PIM.API.Models;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class ChangeLogController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            using (var fileStream = new FileStream(Path.Combine(HttpContext.Current.Server.MapPath("~"), "changeLog.xml"), FileMode.Open, FileAccess.Read))
            {
                var xmlSerializer = new XmlSerializer(typeof(ChangeLog));
                var changeLog = (ChangeLog)xmlSerializer.Deserialize(fileStream);
                return Ok(changeLog);
            }
        }
    }
}