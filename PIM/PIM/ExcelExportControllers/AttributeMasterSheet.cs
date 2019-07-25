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
    public class AttributeMasterSheet : AbstractController
    {
        public void CreateAttributeMaster(XSSFWorkbook workbook)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(EnumDataModel.AttributeMaster.ToString());
            AbstractDataExport ade = new AbstractDataExport();
            var AttributeMaster = Repository.FindBy<Organization>(o => o.IsEnvironment == true)
               .Select(o => new
               {
                   o.Id,
                   o.ShortName,
                   o.LongName
               }).ToList();
            
            ade.CreateSheet(AttributeMaster, sheet);
        }
    }
}