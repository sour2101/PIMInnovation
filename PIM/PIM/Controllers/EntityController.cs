namespace PIM.API.Controllers
{
    using Newtonsoft.Json;
    using Data.Entity;
    using System.Linq;
    using System.Web.Http;
    using System.Collections.Generic;

    public class EntityController : AbstractController
    {
        public IHttpActionResult Get(int pageSize, int pageNumber, string sortBy = null, string sortOrder = "false")
        {
            var entities = Repository.GetAll<EntityDetails>()
                .Select(e=> new {
                    e.AttributeValue,
                    e.CatalogId
                }).ToList();
            return Ok(entities);
        }

        [HttpPost]
        public IHttpActionResult Post(ICollection<EntityDetails> attributeData)
        {
            foreach (EntityDetails e in attributeData)
            {
                Repository.Add(e);
            }

            Repository.Save();
            return Ok(attributeData);
        }
    }
}
