using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PIM.API.ExcelExport
{
    using Controllers;
    using Data.Enums;
    using Data.MasterData;
    using Data.Organizations;
    using NPOI.XSSF.UserModel;
    public class Catalog_Sheet:AbstractController
    {
        public void CreateCatalog(XSSFWorkbook workbook)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(EnumDataModel.Catalog.ToString());
            AbstractDataExport ade = new AbstractDataExport();
            var catalog = Repository.FindBy<Organization>(o => o.IsCatalog == true)
               .Select(o => new
               {
                   o.Id,
                   o.ShortName,
                   o.LongName
               }).ToList();

            ade.CreateSheet(catalog, sheet);

        }
    }
}