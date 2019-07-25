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
    public class AttributeMappingSheet:AbstractController
    {
        public void CreateAttributeMapping(XSSFWorkbook workbook)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(EnumDataModel.AttributeMapping.ToString());
            AbstractDataExport ade = new AbstractDataExport();
            var AttributeMapping = Repository.FindBy<Organization>(o => o.IsEnvironment == true)
               .Select(o => new
               {
                   o.Id,
                  o.ShortName,
                   o.LongName
               }).ToList();

            ade.CreateSheet(AttributeMapping, sheet);

        }
    }
}