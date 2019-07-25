namespace PIM.API.ExcelExport
{
    using Controllers;
    using Data.MasterData;
    using NPOI.XSSF.UserModel;
    using System.Collections.Generic;
    using System;
    using System.Data;

    public class LookupTableSheet : AbstractController
    {

        public void CreateLookupTableSheet(XSSFWorkbook workbook, List<string> sheets)
        {
            AbstractDataExport ade = new AbstractDataExport();
            foreach (string tableId in sheets)
            {
                var tableDetails = Repository.GetById<LookupTables>(Convert.ToInt32(tableId));
                string query = "SELECT * FROM lk_" + tableDetails.TableName;
                XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(tableDetails.TableName);

                ade.CreateSheet(DynamicListFromSql(query), sheet, tableDetails.Columns);
            }
        }

        public System.Data.DataTable DynamicListFromSql(string query)
        {
            System.Data.DataTable lookupTable = new System.Data.DataTable();
            using (var cmd = Repository.Context.Database.Connection.CreateCommand())
            {
                cmd.CommandText = query;
                if (cmd.Connection.State != ConnectionState.Open) { cmd.Connection.Open(); }

                using (var dataReader = cmd.ExecuteReader())
                {
                    lookupTable.Load(dataReader);
                }
            }

            return lookupTable;
        }
    }
}