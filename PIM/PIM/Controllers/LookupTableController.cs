using PIM.API.Logging;
using PIM.Data.MasterData;
using System;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;
using PIM.API.Models;
using System.Reflection.Emit;
using System.Text;
using PIM.API.Linq;
using System.Collections.Generic;

namespace PIM.API.Controllers
{
    public class LookupTableController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get(int tableId, int pageSize, int pageNumber, string sortBy = null, string sortOrder = "false", int? local = null)
        {
            var tableDetails = Repository.GetById<LookupTables>(tableId);
            string sort = sortOrder=="false" ? " ORDER BY "+ sortBy + " DESC" : " ORDER BY " + sortBy + " ASC";
            string query = "SELECT * FROM lk_" + tableDetails.TableName;
            if (!string.IsNullOrEmpty(sortBy))
                query = query + sort;

            DynamicModel dm = new DynamicModel();
            //var tableData = QueryExtensions.DynamicSqlQuery(Repository.Context.Database, query, dm.GetObject(tableDetails.Columns));
            List<dynamic> tableData = QueryExtensions.DynamicListFromSql(Repository.Context.Database, query, new Dictionary<string, object> {  }).ToList();
            
            return Ok(tableData);
        }


        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var result = Repository.FindBy<LookupTables>(lt => lt.Id == id)
                .Select(lt => new
                {
                    lt.Id,
                    lt.TableName,
                    columns = lt.Columns.Select(c => new
                    {
                        c.Id,
                        c.DataType,
                        c.ColumnName,
                        c.Nullable,
                        c.Unique,
                        c.length,
                        c.TableId
                    })
                }).SingleOrDefault();
            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]LookupTables lookupTable)
        {
            if (Repository.FindBy<LookupTables>(lt => lt.TableName == lookupTable.TableName).Any())
            {
                var warningMessage = "The Table \"" + lookupTable.TableName + "\" already exists";
                // Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(ModelState);
            }


            StringBuilder sb = new StringBuilder();
            sb.Append("CREATE TABLE  [dbo].[lk_" + lookupTable.TableName + "]( Id INT IDENTITY    PRIMARY KEY,");
            foreach (LookUpColumns col in lookupTable.Columns)
            {
                string datatype = col.DataType.Contains("char") ? col.DataType + "(" + col.length + ")" : col.DataType;
                string unique = col.Unique ? "UNIQUE" : "";
                sb.Append(col.ColumnName + " " + datatype + " " + unique + " ,");
            }

            sb.Append(")");


            var table = Repository.Context.Database.ExecuteSqlCommand(sb.ToString(), new SqlParameter("@tableName", lookupTable.TableName));
            Repository.Add(lookupTable);
            Repository.Save();
            var message = "The Table \"" + lookupTable.TableName + "\" has been Created";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]LookupTables lookupTable)
        {
            StringBuilder sb = new StringBuilder();
            foreach (LookUpColumns col in lookupTable.Columns)
            {

                if (Repository.FindBy<LookUpColumns>(lc => lc.Id == col.Id).Any())
                {
                    Repository.Update(col);
                    var colDetails = Repository.FindBy<LookUpColumns>(lc => lc.Id == col.Id).SingleOrDefault();
                    sb = new StringBuilder();
                    string datatype = col.DataType.Contains("char") ? col.DataType + "(" + col.length + ")" : col.DataType;
                    string unique = col.Unique ? "UNIQUE" : "";
                    if (colDetails != null && colDetails.Id == col.Id && colDetails.ColumnName != col.ColumnName)
                    {
                        sb.Append("sp_RENAME 'lk_" + lookupTable.TableName + "." + colDetails.ColumnName + "' , '" + col.ColumnName + "', 'COLUMN' ");
                        Repository.Context.Database.ExecuteSqlCommand(sb.ToString(), new SqlParameter("@tableName", lookupTable.TableName));
                    }
                }
                else
                {
                    sb = new StringBuilder();
                    col.TableId = lookupTable.Id;
                    string datatype = col.DataType.Contains("char") ? col.DataType + "(" + col.length + ")" : col.DataType;

                    Repository.Add(col);
                    sb.Append("ALTER TABLE  [dbo].[lk_" + lookupTable.TableName + "] ");
                    sb.Append("ADD " + col.ColumnName + " " + datatype);
                    if (col.Unique)
                    {
                        string unique = col.Unique ? "UNIQUE" : "";
                        sb.Append("ALTER TABLE  [dbo].[lk_" + lookupTable.TableName + "] ");
                        sb.Append("ADD UNIQUE (" + col.ColumnName + " )");
                    }
                    Repository.Context.Database.ExecuteSqlCommand(sb.ToString(), new SqlParameter("@tableName", lookupTable.TableName));
                }
            }



            Repository.Update(lookupTable);
            Repository.Save();

            var message = "The Table \"" + lookupTable.TableName + "\" has been Updated";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

    }
}
