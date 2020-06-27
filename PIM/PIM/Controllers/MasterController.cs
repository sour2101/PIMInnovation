

namespace PIM.API.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using Data.MasterData;
    using Data.Users;
    using Data.Enums;
    using Data.Integrations;
    using Data.Attributes;
    using Data.Organizations;

    [AllowAnonymous]
    public class MasterController : AbstractController
    {
        [HttpGet]
        [Route("api/timeZone")]
        public IHttpActionResult GetTimeZone()
        {
            var timeZonelist = TimeZoneInfo.GetSystemTimeZones()
                .Select(tz=> new {name = tz.DisplayName }).ToList();

            return Ok(timeZonelist);
        }

        [HttpGet]
        [Route("api/languages")]
        public IHttpActionResult GetLanguage()
        {
            var languageList = Repository.GetAll<Locale>()
                .Select(m => new {
                    m.Id,
                    m.Code
                }).ToList();

            return Ok(languageList);
        }

        

        [HttpGet]
        [Route("api/managers")]
        public IHttpActionResult GetManagers()
        {
            var managerList = Repository.GetAll<User>()
                .Select(m => new {
                    m.Id,
                    Name = m.Firstname+" "+m.Lastname
                }).ToList();

            return Ok(managerList);
        }

        [HttpGet]
        [Route("api/getSheets")]
        public IHttpActionResult GetOrganization()
        {
            var enumVals = new List<object>();
            foreach (var item in Enum.GetValues(typeof(EnumDataModel)))
            {
                if((int)item!=1)
                enumVals.Add(new
                {
                    value = (int)item,
                    name = item.ToString()
                });
            }

            return Ok(enumVals);
        }

        [HttpGet]
        [Route("api/dataType")]
        public IHttpActionResult GetDataType()
        {
            var dataTypes = Repository.GetAll<DataType>();

            var result = dataTypes.Select(dt => new {
                dt.Id,
                dt.Name
            }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("api/displayType")]
        public IHttpActionResult GetDisplayType(int id)
        {
            var displayTypes = Repository.GetAll<DisplayType>();

            var result = displayTypes.Where(t => t.DataTypeId == id).Select(m => new {
                m.Id,
               m.Name
            }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("api/uomType")]
        public IHttpActionResult GetUOMType()
        {
            var result = Repository.GetAll<UOMType>()
                .Select(m => new {
                m.Id,
                m.Name
            }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("api/uom")]
        public IHttpActionResult GetUOM(int id)
        {
            var result = Repository.GetAll<UOM>().Where(u=>u.UomTypeId==id)
                .Select(m => new {
                    uomId= m.Id,
                    m.Name
                }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("api/jobType")]
        public IHttpActionResult GetJobTypes()
        {
            var jobType = Repository.GetAll<JobType>();

            var result = jobType.Select(m => new {
                m.Id,
                m.Name
            }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("api/integrationStatus")]
        public IHttpActionResult GetIntegrationStatus()
        {
            var status = Repository.GetAll<IntegrationStatus>();

            var result = status.Select(m => new {
                m.Id,
                m.Name
            }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("api/attributeTypes")]
        public IHttpActionResult GetAttributeType()
        {
            var attrTypes = Repository.GetAll<AttributeType>();

            var result = attrTypes.Select(at => new {
                at.Id,
                label= at.Name,
                leaf=false
            }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("api/attributeLookupColumn")]
        public IHttpActionResult Get(int tableId)
        {
            var result = Repository.GetAll<LookupTables>().Where(lk => lk.Id == tableId).SingleOrDefault();

            var lkList = result.Columns.Select(c => new
            {
                c.ColumnName,
                LookupTableId = c.TableId,
                LookupColumnId = c.Id,
            }).ToList();
       
            return Ok(lkList);
        }

        [HttpGet]
        [Route("api/taxonomyList")]
        public IHttpActionResult GetDropdown()
        {
            var result = Repository.GetAll<Taxonomy>()
                .Select(t => new {
                    t.Id,
                    t.Name
                });

            return Ok(result);
        }
    }
}