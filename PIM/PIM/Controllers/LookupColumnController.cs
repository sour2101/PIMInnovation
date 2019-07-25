namespace PIM.API.Controllers
{
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Text;
    using System.Web.Http;
    using ExcelExport;
    using Logging;
    using Models;
    using Data.MasterData;
    using ExcelImportControllers;

    public class LookupColumnController : AbstractController
    {
        private AbstractDataImport de = new AbstractDataImport();
        private bool CheckUnique(string tableName,string unique)
        {
            string uniqueColname = string.Empty;
            LookupTableSheet lts = new LookupTableSheet();
            string query = "SELECT * FROM lk_" + tableName + " Where " + unique;
            var tableData = lts.DynamicListFromSql(query);
            if (tableData.Rows.Count > 0)
                return true;

            return false;
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]List<ColumnModel> column)
        {
            int tableId = column[0].TableId;
            var tableDetails = Repository.FindBy<LookupTables>(lt => lt.Id == tableId).SingleOrDefault();

            string query = de.InsertQuery(column, tableDetails);
            if (!string.IsNullOrEmpty(de.unique) && CheckUnique(tableDetails.TableName, de.unique))
            {
                var warningMessage = de.uniqueColName + " already has a value " + de.uniqueValue;
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }

            var table = Repository.Context.Database.ExecuteSqlCommand(query, new SqlParameter("@tableName", tableDetails.TableName));

            var message = "The Record Inserted Successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]List<ColumnModel> column)
        {
            int tableId = column[0].TableId;
            var tableDetails = Repository.FindBy<LookupTables>(lt => lt.Id == tableId).SingleOrDefault();

            var table = Repository.Context.Database.ExecuteSqlCommand(de.UpdateQuery(column,tableDetails), new SqlParameter("@tableName", tableDetails.TableName));

            var message = "The Record Updated Successfully";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int tableId,int id)
        {
            var tableDetails = Repository.FindBy<LookupTables>(lt => lt.Id == tableId).SingleOrDefault();
            var table = Repository.Context.Database.ExecuteSqlCommand(de.DeleteQuery(tableDetails.TableName,id), new SqlParameter("@tableName", tableDetails.TableName));
            var message = "Record  has been deleted";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }
    }
}
