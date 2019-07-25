namespace PIM.API.ExcelExport
{
    using System.Linq;
    using Controllers;
    using Data.MasterData;
    using NPOI.XSSF.UserModel;
    using Data.Enums;

    public class EnvironmentSheet : AbstractController
    {
        public void CreateEnviroment(XSSFWorkbook workbook)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(EnumDataModel.Environment.ToString());
            AbstractDataExport ade = new AbstractDataExport();
            var environment = Repository.FindBy<Organization>(o => o.IsEnvironment==true)
                .Select(o => new
                {
                    o.Id,
                    o.ShortName,
                    o.LongName
                }).ToList();

            ade.CreateSheet(environment, sheet);

        }


    }

  

}