namespace PIM.API.AttributeController
{
    using System.Linq;
    using System.Net;
    using System.Web.Http;
    using System.Web.Http.Results;
    //using PIM.API.HttpFilters.Roles;
    using Linq;
    using Logging;
    using Data.Enums;
    using Data.Users;
    using System;
    using data = Data.Attributes;
    using Controllers;

    [AllowAnonymous]
    public class AttributeController : AbstractController
    {
        [HttpGet]
        [Route("api/attribute")]
        public IHttpActionResult Get(int id) {

            var attribute = Repository.GetAll<data.Attribute>()
                .Where(a => a.Id == id )
                .Select(a=>new
                {
                    a.Id,
                    a.ShortName,
                    a.LongName,
                    a.AttributeGroupId,
                    a.DataTypeId,
                    a.DisplayTypeId,
                    a.IsActive,
                    a.IsLocalizable,
                    a.Required,
                    a.ShowAtCreation,
                    a.IsCollection,
                    a.LookupTableId,
                    a.UomTypeId,
                    a.CreatedBy,
                    a.CreatedDate,
                    AttributeLookups = a.AttributeLookups.Select(al=>new {
                        id =al.LookupColumnId,
                        al.LookupTableId,
                        al.LookupColumnId,
                        al.LookupColumns.ColumnName,
                        al.LookupColumns.Unique,
                        al.LookupColumns.Nullable
                    }).ToList(),
                    attributeDropDowns = a.AttributeDropdowns.Select(ad => new {
                        ad.Id,
                        ad.Name
                    }).ToList(),
                    attributeUoms=a.AttributeUOMs.Select(u=>new {
                        u.Uoms.Name,
                        u.UomId
                    })
                })
                .SingleOrDefault();
            return Ok(attribute);
        }

        [HttpGet]
        [Route("api/attributeList")]
        public IHttpActionResult Get(int pageSize, int pageNumber, int attributeGroupId, string sortBy = null, string sortOrder = "false",
            string shortname = null)
        {

            var filteredAttribute = Repository.GetAll<data.Attribute>().Where(a => a.IsActive && a.AttributeGroupId== attributeGroupId);

            if (!string.IsNullOrWhiteSpace(shortname))
                filteredAttribute = filteredAttribute.Where(u => u.ShortName.StartsWith(shortname));


            var pagedUser = filteredAttribute.Select(a => new
            {
                a.Id,
                a.ShortName,
                a.LongName,
                a.LookupTableId,
                DataType = a.DataTypes.Name

            }).ToPagedList(pageNumber, pageSize, sortBy, Convert.ToBoolean(sortOrder));
            return Ok(pagedUser);
        }

        [HttpGet]
        [Route("api/showAtCreation")]
        public IHttpActionResult GetShowAtCreation(int catalogId)
        {
            var showatcreation = Repository.GetAll<data.Attribute>()
                .Where(a => a.ShowAtCreation)
                .Select(a=>new
                {
                    a.Id,
                    a.LongName,
                    a.ShortName,
                    a.Required,
                    a.IsCollection,
                    a.LookupTableId,
                    dataType = a.DataTypes.Name,
                    displayType=a.DisplayTypes.Name,
                    ColumnName = a.AttributeLookups.Select(lk=>new {lk.LookupColumns.ColumnName,lk.LookupTables.TableName }).ToList(),
                    options = a.AttributeDropdowns.Select(ddl =>new {ddl.Id,ddl.Name }).ToList()

                })
                .OrderBy(a=>a.ShortName)
                .ToList();
            return Ok(showatcreation);
        }

        [HttpPost]
        [Route("api/attribute")]
        public IHttpActionResult Post([FromBody]data.Attribute attr)
        {
            attr.IsActive = true;
            var principal = (User)User.Identity;
            if (Repository.FindBy<data.Attribute>(u => u.ShortName == attr.ShortName).Any())
            {
                var warningMessage = "The Attribute \"" + attr.ShortName + "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyexits", warningMessage);
                return BadRequest(ModelState);
            }

            foreach (data.AttributeLookup lk in attr.AttributeLookups)
            {
                lk.AttributeId = attr.Id;
                lk.LookupTableId = attr.LookupTableId;
                Repository.Add(lk);
            }

            foreach (data.AttributeUOM uom in attr.AttributeUOMs)
            {
                uom.AttributeId = attr.Id;
                Repository.Add(uom);
            }

            attr.CreatedBy = principal.Username;
            attr.CreatedDate = DateTime.Now;
            Repository.Add(attr);
            Repository.Save();
            var message = "The Attribute \"" + attr.ShortName + "\" has been added";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        [Route("api/attribute")]
        public IHttpActionResult Put([FromBody]data.Attribute attr)
        {
            var principal = (User)User.Identity;
            attr.ModifiedBy = principal.Id;
            attr.ModifiedDate = DateTime.Now;
            var attrLookup = Repository.GetAll<data.AttributeLookup>().Where(al => al.AttributeId == attr.Id).ToList();
            var attrUOM = Repository.GetAll<data.AttributeUOM>().Where(al => al.AttributeId == attr.Id).ToList();
            foreach (data.AttributeLookup lk in attrLookup)
            {
                Repository.Delete(lk);
                Repository.Save();
            }

            foreach (data.AttributeUOM uom in attrUOM)
            {
                Repository.Delete(uom);
                Repository.Save(); ;
            }

            foreach (data.AttributeLookup lk in attr.AttributeLookups)
            {
                lk.AttributeId = attr.Id;
                lk.LookupTableId = attr.LookupTableId;
                Repository.Add(lk);
            }

            foreach (data.AttributeDropdowns lk in attr.AttributeDropdowns)
            {
                lk.AttributeId = attr.Id;
                if (lk.Id != 0)
                    Repository.Update(lk);
                else
                   Repository.Add(lk);
            }

            foreach (data.AttributeUOM uom in attr.AttributeUOMs)
            {
                uom.AttributeId = attr.Id;
                Repository.Add(uom);
            }

            Repository.Update(attr);
            Repository.Save();
            var message = "The Attribute \"" + attr.ShortName + "\" has been Updated";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpDelete]
        [Route("api/attribute")]
        public IHttpActionResult Delete(int id)
        {
            var principal = (User)User.Identity;
            if (!principal.UserRights.Any(ur => ur.RoleId == (int)Roles.Administrator))
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

            var attr = Repository.FindBy<data.Attribute>(w => w.Id == id).SingleOrDefault();
            if (attr == null)
                return NotFound();

            Repository.Delete(attr);
            Repository.Save();
            var message = "The Attribute \"" + attr.ShortName + "\" has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
