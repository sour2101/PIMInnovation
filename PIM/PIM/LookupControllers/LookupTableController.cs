namespace PIM.API.LookupControllers
{
    using Logging;
    using Data.MasterData;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Web.Http;
    using System.Text;
    using Controllers;

    [AllowAnonymous]
    public class LookupTableController : AbstractController
    {

        [HttpGet]
        public IHttpActionResult Get() {
            var result = Repository.GetAll<LookupTables>()
                .Select(lt=>new {
                    lt.Id,
                    lt.Name
                });

            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var result = Repository.FindBy<LookupTables>(lt => lt.Id == id)
                .Select(lt => new
                {
                    lt.Id,
                    lt.Name,
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
            if (Repository.FindBy<LookupTables>(lt => lt.Name == lookupTable.Name).Any())
            {
                var warningMessage = "The Table \"" + lookupTable.Name + "\" already exists";
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("alreadyExists", warningMessage);
                return BadRequest(lookupTable.Name);
            }


            StringBuilder sb = new StringBuilder();
            sb.Append("CREATE TABLE  [dbo].[lk_" + lookupTable.Name + "]( Id INT IDENTITY    PRIMARY KEY,");
            foreach (LookUpColumns col in lookupTable.Columns)
            {
                string datatype = col.DataType.Contains("char") ? col.DataType + "(" + col.length + ")" : col.DataType;
                string unique = col.Unique ? "UNIQUE" : "";
                sb.Append(col.ColumnName + " " + datatype + " " + unique + " ,");
            }

            sb.Append(")");


            var table = Repository.Context.Database.ExecuteSqlCommand(sb.ToString(), new SqlParameter("@tableName", lookupTable.Name));
            Repository.Add(lookupTable);
            Repository.Save();
            var message = "The Table \"" + lookupTable.Name + "\" has been Created";
            Log.MonitoringLogger.Info(message);
            return Ok(lookupTable.Id);
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
                        sb.Append("sp_RENAME 'lk_" + lookupTable.Name + "." + colDetails.ColumnName + "' , '" + col.ColumnName + "', 'COLUMN' ");
                        Repository.Context.Database.ExecuteSqlCommand(sb.ToString(), new SqlParameter("@tableName", lookupTable.Name));
                    }
                }
                else
                {
                    sb = new StringBuilder();
                    col.TableId = lookupTable.Id;
                    string datatype = col.DataType.Contains("char") ? col.DataType + "(" + col.length + ")" : col.DataType;

                    Repository.Add(col);
                    sb.Append("ALTER TABLE  [dbo].[lk_" + lookupTable.Name + "] ");
                    sb.Append("ADD " + col.ColumnName + " " + datatype);
                    if (col.Unique)
                    {
                        string unique = col.Unique ? "UNIQUE" : "";
                        sb.Append("ALTER TABLE  [dbo].[lk_" + lookupTable.Name + "] ");
                        sb.Append("ADD UNIQUE (" + col.ColumnName + " )");
                    }
                    Repository.Context.Database.ExecuteSqlCommand(sb.ToString(), new SqlParameter("@tableName", lookupTable.Name));
                }
            }



            Repository.Update(lookupTable);
            Repository.Save();

            var message = "The Table \"" + lookupTable.Name + "\" has been Updated";
            Log.MonitoringLogger.Info(message);
            return Ok(lookupTable.Name);
        }

    }

    public class ColumnDetails 
    {
        public string ColumnName { get; set; }

        public string TableName { get; set; }
    }
}
