

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
            var languageList = Repository.GetAll<Language>()
                .Select(m => new {
                    m.Id,
                    m.Name
                }).ToList();

            return Ok(languageList);
        }

        [HttpGet]
        [Route("api/categories")]
        public IHttpActionResult GetCategories(int id)
        {
            var otherLangId = Repository.GetAll<Category>().Where(c => c.Fk_Local == id).Select(c => c.Id).ToList();
            var result = Repository.GetAll<Category>().Where(c=>c.Fk_Local == id)
                .Union(Repository.GetAll<Category>().Where(l=>l.Fk_Local==1 && !otherLangId.Contains(l.Id)));

            var categoryList = result.OrderBy(x=>x.Id).Where(m=>m.ParentId == 0)
                .Select(m => new
                {
                    m.Id,
                    m.ShortName,
                    label = m.LongName,
                    children = result.Where(cm => cm.ParentId==m.Id)
                                    .Select(cm=>new
                                    {
                                       cm.Id,
                                         cm.ShortName,
                                        label = cm.LongName,
                                       children = result.Where(c => c.ParentId == cm.Id)
                                       .Select(c => new
                                       {
                                            c.Id,
                                            c.ShortName,
                                           label = c.LongName
                                       }).ToList()
                                }).ToList()
                            }).ToList();

            return Ok(categoryList);
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
        [Route("api/taxonomy")]
        public IHttpActionResult GetTaxonomy()
        {
            //var taxonomyList = Repository.GetAll<Catalog>();

            //var result = taxonomyList.Where(t=>t.Org==null).Select(m => new {
            //    m.Id,
            //    m.LongName,
            //    m.ShortName
            //}).ToList();

            return Ok();
        }

        [HttpGet]
        [Route("api/enviroment")]
        public IHttpActionResult GetEnviroment()
        {
            var taxonomyList = Repository.GetAll<Organization>().Where(e=>e.IsEnvironment);

            var result = taxonomyList.Select(m => new {
                m.Id,
                m.LongName,
                m.ShortName
            }).ToList();

            return Ok(result);
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
                label= at.ShortName,
                leaf=false
            }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("api/lookupTableList")]
        public IHttpActionResult Get(int? id=null)
        {
            var result = Repository.GetAll<LookupTables>();
            if (id != null)
                result = result.Where(lk => lk.Id == id);

             var lkList= result.Select(lt => new {
                lt.Id,
                lt.TableName,
                columns = lt.Columns.Select(c=> new {
                    c.Id,
                    c.ColumnName,
                    c.Nullable,
                    c.Unique
                }).ToList()
            }).ToList();

            return Ok(lkList);
        }
    }
}