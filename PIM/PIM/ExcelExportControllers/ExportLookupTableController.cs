using NPOI.XSSF.UserModel;
using PIM.API.Controllers;
using PIM.Data.MasterData;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace PIM.API.ExcelExport
{
    [AllowAnonymous]
    public class ExportLookupTableController : AbstractController
    {
        [HttpGet]
        public HttpResponseMessage Get([FromUri]List<string> sheets, [FromUri]List<string> locals)
        {
            MetaDataSheet metadata = new MetaDataSheet();
            LookupTableSheet lts = new LookupTableSheet();

            //Create Workbook
            var workbook = new XSSFWorkbook();
            var xmlProps = workbook.GetProperties();
            xmlProps.CoreProperties.Creator = "Saint-Gobain - PIM";

            var tableNames = Repository.GetAll<LookupTables>().Where(lt => sheets.Contains(lt.Id.ToString())).Select(lt=>lt.Name).ToList();

            metadata.CreateMetaData(workbook,tableNames);
            lts.CreateLookupTableSheet(workbook, sheets);

            using (var memoryStream = new MemoryStream())
            {
                workbook.Write(memoryStream);
                var response = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(memoryStream.ToArray()),
                };
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = $"LookupTable{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx"
                };

                response.Content.Headers.Add("Access-Control-Expose-Headers", "Content-Disposition");
                return (response);
            }
        }
    }
}
