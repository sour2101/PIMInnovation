using PIM.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PIM.API.Controllers
{
    public class EntityController : AbstractController
    {
        public IHttpActionResult Get()
        {
            var entities = Repository.GetAll<Entity>().ToList();
            return Ok(entities);
        }
    }
}
