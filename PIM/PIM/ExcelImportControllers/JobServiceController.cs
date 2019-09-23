using System.IO;
using System.Web.Http;

namespace PIM.API.ExcelImport
{
    using System.Linq;
    using Data.Integrations;
    using ExcelImportControllers;
    using Logging;
    using Controllers;
    using NPOI.XSSF.UserModel;
    using Data.Enums;

    [AllowAnonymous]
    public class JobServiceController : AbstractController
    {
       [HttpPost]
        public IHttpActionResult Post([FromBody]FileDetails fileDetails)
        {
            try
            {
                XSSFWorkbook hssfwb;
                string filePath = Properties.Settings.Default.progressPath + fileDetails.DirectoryName + "\\" + fileDetails.FileName;
                using (FileStream file = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                {
                    hssfwb = new XSSFWorkbook(file);
                    var result = Repository.FindBy<FileDetails>(f => f.FileName == fileDetails.FileName).SingleOrDefault();
                    if (fileDetails.DirectoryName == DirectoryNames.LookupModelExcel.ToString())
                    {
                        InsertLookupSheet ls = new InsertLookupSheet();
                        ls.LookupInsert(hssfwb, result);
                    }
                    else if (fileDetails.DirectoryName == DirectoryNames.DataModelExcel.ToString())
                    {
                        InsertDataModel dataModel = new InsertDataModel();
                        dataModel.DataModelInsert(hssfwb, fileDetails);
                    }
                    File.Move(filePath, Properties.Settings.Default.completedPath + fileDetails.DirectoryName + "\\" + fileDetails.FileName);
                }
            }
            catch (System.Exception ex) 
            {
                var message = ex.Message;
                Log.MonitoringLogger.Info(message);
            }
            return Ok("Success");
        }
    }
}
