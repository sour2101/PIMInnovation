namespace PIM.API.ExcelImportControllers
{
    using System.Linq;
    using Data.MasterData;
    using Models;
    using System.Collections.Generic;
    using NPOI.SS.UserModel;
    using ExcelExport;

    public class AbstractDataImport
    {
        public string errorMessge = string.Empty;
        public string unique = string.Empty;

        public string uniqueColName = string.Empty;

        public string uniqueValue = string.Empty;
        public List<ColumnModel> GetHeader(ICollection<LookUpColumns> columns,IRow row,string uniqueColumn)
        {
            errorMessge = string.Empty;
            List<ColumnModel> column = new List<ColumnModel>();
            column.Add(new ColumnModel { Key = "Id", value = "0" });
            for (int r = 0; r < row.LastCellNum; r++)
            {
                if (!columns.Any(c => c.ColumnName.ToLower() == row.GetCell(r).ToString().ToLower()) && row.GetCell(r).ToString().ToLower()!= "id")
                {
                    errorMessge = "Invalid column name "+ row.GetCell(r).ToString();
                    break;
                }

                errorMessge = "Unique column is missing.";
                foreach (LookUpColumns col in columns)
                {
                    if (uniqueColumn != null && uniqueColumn.ToLower() == row.GetCell(r).ToString().ToLower())
                        errorMessge = string.Empty;

                    if (col.ColumnName.ToLower() == row.GetCell(r).ToString().ToLower())
                    {
                        column.Add(new ColumnModel { Key = col.ColumnName, value = r.ToString() });
                    }
                }
            }

            return column;
        }

        public List<ColumnModel> GetRow(List<ColumnModel> columns, IRow row)
        {
            List<ColumnModel> rowColumn = new List<ColumnModel>();
            for (int r = 0; r < row.LastCellNum; r++)
            {
                foreach (ColumnModel col in columns)
                {
                    if (col.value == r.ToString())
                    {
                        rowColumn.Add(new ColumnModel { Key = col.Key, value = row.GetCell(r) != null ? GetValue(row.GetCell(r).ToString()) : null });
                    }
                }
            }

            return rowColumn;
        }

        public string InsertQuery(List<ColumnModel> column,LookupTables tableDetails)
        {
            int tableId = column[0].TableId;
            string query = string.Empty;
            string columnValues = string.Empty;
            string columnName = string.Empty;
            foreach (LookUpColumns col in tableDetails.Columns)
            {
                columnName = string.IsNullOrEmpty(columnName) ? col.ColumnName : columnName + "," + col.ColumnName;
                var lkc = column.Where(c => c.Key == col.ColumnName).SingleOrDefault();
                if (col.Unique)
                {
                    uniqueColName = string.IsNullOrEmpty(uniqueColName) ? col.ColumnName : uniqueColName + " , " + col.ColumnName;
                    uniqueValue = string.IsNullOrEmpty(uniqueValue) ? lkc.value : uniqueValue + " , " + lkc.value;
                    unique = string.IsNullOrEmpty(unique) ? col.ColumnName + "='" + lkc.value + "'" : unique + " AND " + col.ColumnName + "='" + lkc.value + "'";
                }
                columnValues = string.IsNullOrEmpty(columnValues) ? "'" + lkc.value + "'" : columnValues + ",'" + lkc.value + "'";
            }

            query = "INSERT INTO   [dbo].[lk_" + tableDetails.TableName + "](" + columnName + ") VALUES(" + columnValues + ")";
            return query;
        }

        public string UpdateQuery(List<ColumnModel> column,LookupTables tableDetails)
        {
            int tableId = column[0].TableId;
            string query = string.Empty;
            string update = string.Empty;
            string id = column.Where(c=>c.Key=="Id").Select(c=>c.value).SingleOrDefault();
            foreach (LookUpColumns col in tableDetails.Columns)
            {
                var lkc = column.Where(c => c.Key == col.ColumnName).SingleOrDefault();
                update = string.IsNullOrEmpty(update) ? col.ColumnName + "='" + lkc.value + "'" : update + "," + col.ColumnName + "='" + lkc.value + "'";
            }

            query = "UPDATE [dbo].[lk_" + tableDetails.TableName + "] SET " + update + " WHERE Id =" + id;
            return query;
        }

        public string DeleteQuery(string tableName,int id)
        {
            string query = "DELETE lk_" + tableName + " WHERE Id=" + id;
            return query;
        }

        public bool Exists(List<ColumnModel> column, LookupTables tableDetails)
        {
            if (column.Any(c => c.Key == "Id" && !string.IsNullOrEmpty(c.value)))
                return true;

            return false;
        }

        public string GetValue(string value)
        {
            if (value.Contains("'"))
                return value.Replace("'", "''");

            return value;
        }
    }
}