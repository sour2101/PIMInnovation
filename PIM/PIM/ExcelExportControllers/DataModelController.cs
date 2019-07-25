using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NPOI.XSSF.UserModel;
using System.IO;
using System.Net.Http.Headers;
using PIM.Data.Enums;

namespace PIM.API.ExcelExport
{
    [AllowAnonymous]
    public class DataModelController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Get([FromUri]List<string> sheets, [FromUri]List<string> locals)
        {
            MetaDataSheet metadata = new MetaDataSheet();
            EnvironmentSheet enr = new EnvironmentSheet();
            Enviroment_catalog enc = new Enviroment_catalog();
            Catalog_Sheet cat = new Catalog_Sheet();
            EntitySheet entity = new EntitySheet();
            Entity_ContainerSheet econ = new Entity_ContainerSheet();
            AttributeMasterSheet atm = new AttributeMasterSheet();
            CategoryMasterSheet ctm = new CategoryMasterSheet();
            AttributeMappingSheet attrmap = new AttributeMappingSheet();
            TechnicalCategorySheet tcs = new TechnicalCategorySheet();

            //Create Workbook
            var workbook = new XSSFWorkbook();
            var xmlProps = workbook.GetProperties();
            xmlProps.CoreProperties.Creator = "Saint-Gobain - PIM";

            metadata.CreateMetaData(workbook, Enum.GetNames(typeof(EnumDataModel)));
            if (sheets.Contains(EnumDataModel.Environment.ToString()))
                enr.CreateEnviroment(workbook);

            if (sheets.Contains(EnumDataModel.Catalog.ToString()))
                cat.CreateCatalog(workbook);

            if (sheets.Contains(EnumDataModel.Enviroment_catalog.ToString()))
                enc.CreateEnviroment_catalog(workbook);

            if (sheets.Contains(EnumDataModel.Entity.ToString()))
                entity.CreateEntity(workbook);

            if (sheets.Contains(EnumDataModel.Entity_Containor.ToString()))
                econ.CreateEntity_Containor(workbook);

            if (sheets.Contains(EnumDataModel.AttributeMaster.ToString()))
                atm.CreateAttributeMaster(workbook);

            if (sheets.Contains(EnumDataModel.CategoryMaster.ToString()))
                ctm.CreateCategoryMaster(workbook);

            if (sheets.Contains(EnumDataModel.AttributeMapping.ToString()))
                attrmap.CreateAttributeMapping(workbook);

            if (sheets.Contains(EnumDataModel.Technical_Category.ToString()))
                tcs.CreateTechnical_Category(workbook);

            string fileName = $"DataModel{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx";
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
                    FileName = fileName
                };

                response.Content.Headers.Add("Access-Control-Expose-Headers", "Content-Disposition");
                return (response);
            }
        }
    }
}
