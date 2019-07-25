using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Results;
//using PIM.API.HttpFilters.Roles;
using PIM.API.Linq;
using PIM.Data;
using PIM.API.Logging;
using PIM.Data.Enums;
using PIM.Data.MasterData;
using System;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class CatalogsController : AbstractController
    {

        [HttpGet]
        public IHttpActionResult Get(int? id=null)
        {
            var catalogList = Repository.GetAll<Organization>();

            if (id!=null)
                catalogList = catalogList.Where(m => m.ParentId == id);

            var result = catalogList.Where(c=>c.IsCatalog).Select(m => new {
                m.Id,
                m.LongName,
                m.ShortName
            }).ToList();

            return Ok(result);
        }
    }
}
