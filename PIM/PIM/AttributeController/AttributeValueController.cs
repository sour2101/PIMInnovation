

namespace PIM.API.AttributeController
{
    using Controllers;
    using Data.Attributes;
    using Data.Users;
    using Logging;
    using System;
    using System.Collections.Generic;
    using System.Web.Http;

    public class AttributeValueController : AbstractController
    {
        [HttpPost]
        public IHttpActionResult Post([FromBody]ICollection<AttributeValues> attr)
        {
             
            var principal = (User)User.Identity;

            foreach (AttributeValues attrval in attr)
            {
                Repository.Add(attr);
            }

            Repository.Save();

            var message = "The Entity  has been created";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
