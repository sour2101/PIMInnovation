using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;


namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class FileController : ApiController
    {

        [HttpPost]
        public HttpResponseMessage FileUpload()
        {
            try
            {
                
                var httpRequest = HttpContext.Current.Request;
                if (!Convert.ToBoolean(httpRequest.Params["admin"]))
                    return Request.CreateResponse(HttpStatusCode.Forbidden);

                var postedFile = httpRequest.Files["File"];
                string filePath = Properties.Settings.Default.jobServicePath + "DataModelExcel/" + postedFile.FileName;
                if (File.Exists(filePath))
                    File.Delete(filePath);

                postedFile.SaveAs(filePath);

                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (System.Exception)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden); 
            }
           
        }

        [HttpPost]
        [Route("api/imageUpload")]
        public HttpResponseMessage ImageUpload()
        {
            try
            {

                var httpRequest = HttpContext.Current.Request;
                if (!Convert.ToBoolean(httpRequest.Params["admin"]))
                    return Request.CreateResponse(HttpStatusCode.Forbidden);

                var postedFile = httpRequest.Files["File"];
                string filePath = Properties.Settings.Default.jobServicePath + "DataModelExcel/" + postedFile.FileName;
                if (File.Exists(filePath))
                    File.Delete(filePath);

                postedFile.SaveAs(filePath);

                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (System.Exception)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden);
            }

        }


    }
}
