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
        public IHttpActionResult Get(int tableId, [FromUri]ICollection<string> where = null,[FromUri]ICollection<string> columnDetails = null)
        {
            var tableDetails = Repository.GetById<LookupTables>(tableId);
           
            string column = "*";
            string query = "SELECT ";
            if (columnDetails.Any())
            {
                column = "Id ";
                foreach (string col in columnDetails)
                    column = column + "," + col;
            }

            query = query + column + " FROM lk_" + tableDetails.TableName;

            

            DynamicModel dm = new DynamicModel();
            //var tableData = QueryExtensions.DynamicSqlQuery(Repository.Context.Database, query, dm.GetObject(tableDetails.Columns));
            List<dynamic> tableData = QueryExtensions.DynamicListFromSql(Repository.Context.Database, query, new Dictionary<string, object> { }).ToList();

            return Ok(tableData);
        }
    }
}
