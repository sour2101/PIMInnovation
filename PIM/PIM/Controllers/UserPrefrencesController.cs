﻿using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Results;
//using PIM.API.HttpFilters.Roles;
using PIM.API.Linq;
using PIM.Data;
using PIM.API.Logging;
using PIM.Data.Enums;
using PIM.Data.Users;
using System;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class UserPrefrencesController : AbstractController
    {

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var userpreList = Repository.GetAll<UserPreferences>().Where(up => up.UserId == id)
                .Select(up => new {
                    up.CatalogId,
                    up.RoleId,
                    up.Taxonomy,
                    up.TimeZone,
                    up.DataLocal,
                    up.UserId,
                    up.OrganizationId,
                    up.Users.Username,
                    CatalogName = up.Catalogs.LongName,
                    OrganizationName = up.Organization.LongName
                }).SingleOrDefault();

            return Ok(userpreList);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]UserPreferences user)
        {
            var principal = (User)User.Identity;

            user.CreatedBy = principal.Username;
            user.CreatedDate = DateTime.Now;
            Repository.Add(user);
            Repository.Save();
            var message = "The User  has been Added";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]UserPreferences user)
        {
            var principal = (User)User.Identity;

            user.ModifiedBy = principal.Id;
            user.ModifiedDate = DateTime.Now;
            Repository.Update(user);
            Repository.Save();
            var message = "The User Preferences has been Updated";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}