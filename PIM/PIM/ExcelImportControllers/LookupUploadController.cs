
namespace PIM.API.ExcelImport
{
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Web;
    using System.Web.Http;
    using Data.Enums;
    using Controllers;
    using System;
    using Data.Integrations;
    using HttpFilters;
    using System.Linq;
    using System.Web.Http.Results;
    using Logging;

    [AllowAnonymous]
    public class LookupUploadController : AbstractController
    {

        [HttpPost]
        [RoleAuthorize(Roles.Administrator)]
        public IHttpActionResult FileUpload()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                if (!Convert.ToBoolean(httpRequest.Params["admin"]))
                    return new StatusCodeResult(HttpStatusCode.Forbidden, Request);

                var postedFile = httpRequest.Files["File"];
                string dirName = "LookupModelExcel/";
                string fileName = "Lookup Import " + DateTime.Now.ToString("yyyyddMMHHmmss")+ Path.GetExtension(postedFile.FileName); 
                string filePath = Properties.Settings.Default.jobServicePath + dirName + fileName;
                //if (Repository.FindBy<FileDetails>(f => f.FileName == postedFile.FileName).Any())
                //{
                //    var warningMessage = "file already exists";
                //    Log.MonitoringLogger.Warn(warningMessage);
                //    ModelState.AddModelError("alreadyExist", warningMessage);
                //    return BadRequest(ModelState);
                //}

                FileDetails fd = new FileDetails();
                fd.SourceFileName = postedFile.FileName;
                fd.FileName = fileName;
                fd.DirectoryName = dirName;
                fd.FilePath = filePath;
                fd.CreatedBy = httpRequest.Params["user"];
                fd.CreatedDate = DateTime.Now;

                if (File.Exists(filePath))
                    File.Delete(filePath);

                postedFile.SaveAs(filePath);

                var message = "File Uploaded Successfully";
                Log.MonitoringLogger.Warn(message);

                Repository.Add(fd);
                Repository.Save();
                return Ok(HttpStatusCode.Created);
            }
            catch (Exception)
            {
                return Ok(HttpStatusCode.Forbidden);
            }
        }

    }
}
