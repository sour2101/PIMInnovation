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
    using System.Data.Entity;
    using Data.Organizations;

    [AllowAnonymous]
    public class AttributeController : AbstractController
    {
        [HttpGet]
        [Route("api/attribute")]
        public IHttpActionResult GetDropdown()
        {
            var result = Repository.GetAll<data.Attribute>()
                .Select(t => new {
                    t.Id,
                    Name =t.LongName
                });

            return Ok(result);
        }

        [HttpGet]
        [Route("api/attribute")]
        public IHttpActionResult Get(int attributeGroupId)
        {
            var principal = (User)User.Identity;

            var orgId = principal.UserOrgMappings.Where(uo=>uo.UserId == principal.Token.UserId).Select(uo => uo.OrgId).ToArray();

            var filteredAttribute = Repository.GetAll<AttributeOrgMapping>()
                .Where(a => a.Attribute.IsActive && orgId.Contains(a.OrgId));

            
            if (attributeGroupId != 0)
                filteredAttribute = filteredAttribute.Where(a => a.Attribute.AttributeGroupId == attributeGroupId);


            var pagedUser = filteredAttribute
                .Select(a => new
                {
                    a.Attribute.Id,
                    a.Attribute.ShortName,
                    name = a.Attribute.LongName,
                    a.Attribute.LookupTableId,
                    DataType = a.Attribute.DataTypes.Name
                }).Distinct()
            .ToList();
            return Ok(pagedUser);
        }

        [HttpGet]
        [Route("api/attribute")]
        public IHttpActionResult GetById(int id) {

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
                        al.LookupTableId,
                        al.LookupColumnId,
                        al.LookupColumns.ColumnName,
                    }).ToList(),
                    attributeDropdowns = a.AttributeDropdowns.Select(ad => new {
                        ad.Id,
                        ad.Name
                    }).ToList(),
                    attributeUOMs = a.AttributeUOMs.Select(u=>new {
                        u.Uoms.Name,
                        u.UomId
                    }) 
                })
                .SingleOrDefault();
            return Ok(attribute);
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
                    ColumnName = a.AttributeLookups.Select(lk=>new {lk.LookupColumns.ColumnName,lk.LookupTables.Name }).ToList(),
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
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyexits", warningMessage);
                return BadRequest(attr.ShortName);
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

            foreach (data.AttributeDropdowns ddl in attr.AttributeDropdowns)
            {
                ddl.AttributeId = attr.Id;
                Repository.Add(ddl);
            }

             

            attr.CreatedBy = principal.Username;
            attr.CreatedDate = DateTime.Now;
            Repository.Add(attr);
            Repository.Save();
            var message = "The Attribute \"" + attr.ShortName + "\" has been added";
            Log.MonitoringLogger.Info(message);
            return Ok(attr.ShortName);
        }

        [HttpPut]
        [Route("api/attribute")]
        public IHttpActionResult Put([FromBody]data.Attribute attr)
        {
            var principal = (User)User.Identity;
            attr.ModifiedBy = principal.Username;
            attr.ModifiedDate = DateTime.Now;

            foreach (data.AttributeLookup lk in attr.AttributeLookups)
            {
                lk.AttributeId = attr.Id;
                lk.LookupTableId = attr.LookupTableId;
                if (Repository.GetAll<data.AttributeLookup>().Any(al => al.AttributeId == lk.AttributeId && al.LookupTableId == lk.LookupTableId && al.LookupColumnId == lk.LookupColumnId))
                {
                    Repository.Update(lk);
                }
                else
                {
                    Repository.Update(lk);
                }
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
                if (Repository.GetAll<data.AttributeUOM>().Any(au => au.AttributeId == uom.AttributeId && au.UomId == uom.UomId))
                {
                    Repository.Update(uom);
                }
                else
                {
                    Repository.Add(uom);
                }
            }



            Repository.Update(attr);
            Repository.Save();
            var message = "The Attribute \"" + attr.ShortName + "\" has been Updated";
            Log.MonitoringLogger.Info(message);
            return Ok(attr.ShortName);
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
            return Ok(attr.ShortName);
        }
    }
}
