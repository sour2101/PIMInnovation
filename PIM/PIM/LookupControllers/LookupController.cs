namespace PIM.API.LookupControllers
{
    using Data.MasterData;
    using Linq;
    using Models;
    using PIM.API.Controllers;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    public class LookupController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get(int tableId,string local=null, string where = null)
        {
            var tableDetails = Repository.GetById<LookupTables>(tableId);
           
            string query = "SELECT * FROM lk_" + tableDetails.TableName;

            if (!string.IsNullOrEmpty(where))
                query = query +" WHERE "+ where.Replace('@','=');

            

            DynamicModel dm = new DynamicModel();
            //var tableData = QueryExtensions.DynamicSqlQuery(Repository.Context.Database, query, dm.GetObject(tableDetails.Columns));
            List<dynamic> tableData = QueryExtensions.DynamicListFromSql(Repository.Context.Database, query, new Dictionary<string, object> { }).ToList();

            return Ok(tableData);
        }
    }
}
