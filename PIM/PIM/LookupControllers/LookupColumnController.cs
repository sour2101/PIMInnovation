namespace PIM.API.LookupControllers
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
    using Controllers;

    public class LookupColumnController : AbstractController
    {
        private AbstractDataImport de = new AbstractDataImport();
        

        [HttpGet]
        public IHttpActionResult Get(int tableId)
        {
            var columns = Repository.GetAll<LookUpColumns>()
                .Where(lc => lc.TableId == tableId)
                .Select(lc => new
                {
                    lc.Id,
                    Name = lc.ColumnName
                });

            return Ok(columns);
        }


       
        
    }
}
