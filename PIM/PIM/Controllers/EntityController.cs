namespace PIM.API.Controllers
{
    using Newtonsoft.Json;
    using Data.Entity;
    using System.Linq;
    using System.Web.Http;

    public class EntityController : AbstractController
    {
        public IHttpActionResult Get()
        {
            var entities = Repository.GetAll<Entity>().ToList();
            return Ok(entities);
        }

        [HttpPost]
        public IHttpActionResult Post(dynamic attributeData)
        {

            var result = JsonConvert.SerializeObject(attributeData);
            return Ok(result);
        }
    }
}
