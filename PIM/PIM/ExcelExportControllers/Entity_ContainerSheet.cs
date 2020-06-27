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

    public class Entity_ContainerSheet:AbstractController
    {
        public void CreateEntity_Containor(XSSFWorkbook workbook)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(EnumDataModel.Entity_Containor.ToString());
            AbstractDataExport ade = new AbstractDataExport();
            var Entity_Containor = Repository.FindBy<Organization>(o => o.IsEnvironment == true)
               .Select(o => new
               {
                   o.Id,
                   o.ShortName,
                   o.LongName
               }).ToList();

            ade.CreateSheet(Entity_Containor, sheet);

        }
    }
}