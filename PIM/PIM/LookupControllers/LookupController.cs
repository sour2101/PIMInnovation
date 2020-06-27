namespace PIM.API.LookupControllers
{
    using Data.MasterData;
    using ExcelExport;
    using ExcelImportControllers;
    using Linq;
    using Logging;
    using Models;
    using PIM.API.Controllers;
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    public class LookupController : AbstractController
    {
        private AbstractDataImport de = new AbstractDataImport();

        [HttpGet]
        public IHttpActionResult Get(int tableId, int locale, [FromUri]ICollection<string> columnDetails = null)
        {
            if(tableId==0)
            {
                return Ok();
            }
            var tableDetails = Repository.GetById<LookupTables>(tableId);
           // string sort = sortOrder == "false" ? " ORDER BY " + sortBy + " DESC" : " ORDER BY " + sortBy + " ASC";
            string column = "*";
            string query = "SELECT ";
            if (columnDetails.Any())
            {
                column = "Id ";
                foreach (string col in columnDetails)
                    column = column + "," + col;
            }

            query = query + column + " FROM lk_" + tableDetails.Name;

            //if (!string.IsNullOrEmpty(sortBy))
            //    query = query + sort;

            DynamicModel dm = new DynamicModel();
            //var tableData = QueryExtensions.DynamicSqlQuery(Repository.Context.Database, query, dm.GetObject(tableDetails.Columns));
            List<dynamic> tableData = QueryExtensions.DynamicListFromSql(Repository.Context.Database, query, new Dictionary<string, object> { }).ToList();

            return Ok(tableData);
        }

        [HttpGet]
        public IHttpActionResult Get(int tableId,string local=null, string where = null)
        {
            var tableDetails = Repository.GetById<LookupTables>(tableId);
           
            string query = "SELECT * FROM lk_" + tableDetails.Name;

            if (!string.IsNullOrEmpty(where))
                query = query +" WHERE "+ where.Replace('@','=');

            

            DynamicModel dm = new DynamicModel();
            //var tableData = QueryExtensions.DynamicSqlQuery(Repository.Context.Database, query, dm.GetObject(tableDetails.Columns));
            List<dynamic> tableData = QueryExtensions.DynamicListFromSql(Repository.Context.Database, query, new Dictionary<string, object> { }).ToList();

            return Ok(tableData);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]List<ColumnModel> column)
        {
            int tableId = column[0].TableId;
            var tableDetails = Repository.FindBy<LookupTables>(lt => lt.Id == tableId).SingleOrDefault();

            string query = de.InsertQuery(column, tableDetails);
            if (!string.IsNullOrEmpty(de.unique) && CheckUnique(tableDetails.Name, de.unique))
            {
                var warningMessage = de.uniqueColName + " already has a value " + de.uniqueValue;
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }

            var table = Repository.Context.Database.ExecuteSqlCommand(query, new SqlParameter("@tableName", tableDetails.Name));

            var message = "The Record Inserted Successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]List<ColumnModel> column)
        {
            int tableId = column[0].TableId;
            var tableDetails = Repository.FindBy<LookupTables>(lt => lt.Id == tableId).SingleOrDefault();

            var table = Repository.Context.Database.ExecuteSqlCommand(de.UpdateQuery(column, tableDetails), new SqlParameter("@tableName", tableDetails.Name));

            var message = "The Record Updated Successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int tableId, int id)
        {
            var tableDetails = Repository.FindBy<LookupTables>(lt => lt.Id == tableId).SingleOrDefault();
            var table = Repository.Context.Database.ExecuteSqlCommand(de.DeleteQuery(tableDetails.Name, id), new SqlParameter("@tableName", tableDetails.Name));
            var message = "Record  has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        private bool CheckUnique(string tableName, string unique)
        {
            string uniqueColname = string.Empty;
            LookupTableSheet lts = new LookupTableSheet();
            string query = "SELECT * FROM lk_" + tableName + " Where " + unique;
            var tableData = lts.DynamicListFromSql(query);
            if (tableData.Rows.Count > 0)
                return true;

            return false;
        }
    }
}
