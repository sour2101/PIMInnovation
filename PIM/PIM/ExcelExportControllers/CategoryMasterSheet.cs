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
    public class CategoryMasterSheet:AbstractController
    {
        public void CreateCategoryMaster(XSSFWorkbook workbook)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(EnumDataModel.CategoryMaster.ToString());
            AbstractDataExport ade = new AbstractDataExport();
            var CategoryMaster = Repository.FindBy<Organization>(o => o.IsEnvironment == true)
               .Select(o => new
               {
                   o.Id,
                   o.ShortName,
                   o.LongName
               }).ToList();

            ade.CreateSheet(CategoryMaster, sheet);
            
        }




    }

}
