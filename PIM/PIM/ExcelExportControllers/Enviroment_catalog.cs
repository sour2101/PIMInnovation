using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PIM.API.ExcelExport
{
    using Controllers;
    using Data.Enums;
    using Data.MasterData;
    using NPOI.XSSF.UserModel;
    public class Enviroment_catalog : AbstractController
    {
        public void CreateEnviroment_catalog(XSSFWorkbook workbook)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(EnumDataModel.Enviroment_catalog.ToString());
            AbstractDataExport ade = new AbstractDataExport();
            var Enviroment_catalog = Repository.FindBy<Organization>(o => o.IsEnvironment == true)
               .Select(o => new
               {
                   o.Id,
                   o.ShortName,
                   o.LongName
               }).ToList();

            ade.CreateSheet(Enviroment_catalog, sheet);

        }
    }
}