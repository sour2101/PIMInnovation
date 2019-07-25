namespace PIM.API.ExcelExport
{
    using NPOI.SS.Util;
    using NPOI.XSSF.UserModel;
    using System.Collections.Generic;

    public class MetaDataSheet : AbstractDataExport
    {
         private List<string> ddl = new List<string>() { "No", "Yes" };
        public void CreateMetaData(XSSFWorkbook workbook,string[] sheetNames)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet("MetaData");
            string formula= CreateDropDown(workbook, ddl, "Load");
           
            var data = new List<MetaData>();
            foreach (string str in sheetNames)
            {
                data.Add(new MetaData { SheetName = str, Load = formula });
            }

            DropDownList = ddl.ToArray();
            CreateSheet(data, sheet);
        }

        public void CreateMetaData(XSSFWorkbook workbook, List<string> sheetNames)
        {
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet("MetaData");
            string formula = CreateDropDown(workbook, ddl, "Load");
            var data = new List<MetaData>();
            foreach (string str in sheetNames)
            {
                data.Add(new MetaData { SheetName = str, Load = formula });
            }

            DropDownList = ddl.ToArray();
            CreateSheet(data, sheet);
        }

        public string CreateDropDown(XSSFWorkbook workbook,List<string> data, string sheetName)
        {
            string formula;
            XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(sheetName);
            CreateSheet(data, sheet);
            workbook.SetSheetHidden(1, true);
            formula = sheetName + "!$A$1:$A$" + data.Count;
            return formula;
        }
    }

    public class MetaData
    {
        public string SheetName { get; set; }
        public string Load { get; set; }
    }

    public class DropDown
    {
        public string Name { get; set; }
    }
}
