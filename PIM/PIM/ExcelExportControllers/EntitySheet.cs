using System.Linq;

namespace PIM.API.ExcelExport
{
    using Controllers;
    using Data.Enums;
    using Data.MasterData;
    using Data.Organizations;
    using NPOI.XSSF.UserModel;

    public class EntitySheet:AbstractController
    {
        public void CreateEntity(XSSFWorkbook workbook)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(EnumDataModel.Entity.ToString());
            AbstractDataExport ade = new AbstractDataExport();
            var Entity = Repository.FindBy<Organization>(o => o.IsEnvironment == true)
               .Select(o => new
               {
                   o.Id,
                   o.ShortName,
                   o.LongName
               }).ToList();

            ade.CreateSheet(Entity, sheet);

        }




    }
}