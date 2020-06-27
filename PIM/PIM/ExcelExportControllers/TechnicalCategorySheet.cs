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
    public class TechnicalCategorySheet:AbstractController
    {
        public void CreateTechnical_Category(XSSFWorkbook workbook)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(EnumDataModel.Technical_Category.ToString());
            AbstractDataExport ade = new AbstractDataExport();
            var Technical_Category = Repository.FindBy<Organization>(o => o.IsEnvironment == true)
               .Select(o => new
               {
                   o.Id,
                   o.ShortName,
                   o.LongName
               }).ToList();

            ade.CreateSheet(Technical_Category, sheet);

        }
    }
}