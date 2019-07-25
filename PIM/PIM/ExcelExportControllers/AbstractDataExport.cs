using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.ComponentModel;
using PIM.Data.MasterData;
using System.Linq;
using NPOI.SS.Util;

namespace PIM.API.ExcelExport
{
    public class AbstractDataExport 
    {
        public string[] DropDownList;
        public void CreateSheet<T>(IEnumerable<T> data, XSSFSheet sheet)
        {
            //CreateHeader
            var header = sheet.CreateRow(0);
            header.CreateCell(0);
            PropertyDescriptorCollection props = TypeDescriptor.GetProperties(typeof(T));
            int i = 0, j = 0;
            foreach (PropertyDescriptor prop in props)
            {
                var cell = header.CreateCell(i);
                cell.SetCellValue(prop.Name);
                i++;
            }


            //CreateRows
            i = 1;
            foreach (T item in data)
            {
                var row = sheet.CreateRow(i);
                j = 0;
                foreach (PropertyDescriptor prop in props)
                {
                    if (prop.Converter.ConvertToString(prop.GetValue(item)).Contains("$"))
                    {
                        XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper(sheet);
                        XSSFDataValidationConstraint constraint = (XSSFDataValidationConstraint)dvHelper.CreateExplicitListConstraint(DropDownList);
                        CellRangeAddressList addressList = new CellRangeAddressList(i , i, j, j);
                        XSSFDataValidation validation = (XSSFDataValidation)dvHelper.CreateValidation(constraint, addressList);
                        sheet.AddValidationData(validation);
                       // row.CreateCell(j).SetCellValue(prop.Converter.ConvertToString(prop.GetValue(item)));
                    }
                    else
                        row.CreateCell(j).SetCellValue(prop.Converter.ConvertToString(prop.GetValue(item)));
                    j++;
                }

                i++;
            }
        }

        public void CreateSheet(DataTable data, XSSFSheet sheet,ICollection<LookUpColumns> columns)
        {
            //CreateHeader
            var header = sheet.CreateRow(0);
            header.CreateCell(0);
            int i = 0, j = 0;
            columns.Add(new LookUpColumns { Id = 0, ColumnName = "Id", Unique = true, DataType = "int", Nullable = false });
            foreach (LookUpColumns col in columns.OrderBy(c=>c.Id))
            {
                var cell = header.CreateCell(i);
                cell.SetCellValue(col.ColumnName);
                sheet.AutoSizeColumn(i);
                i++;
            }

            //CreateRows
            i = 0;
            foreach (DataRow dr in data.Rows)
            {
                var row = sheet.CreateRow(i + 1);
                j = 0;
                foreach (LookUpColumns col in columns.OrderBy(c => c.Id))
                {
                    row.CreateCell(j).SetCellValue(dr[col.ColumnName].ToString());
                    j++;
                }

                i++;
            }
        }
    }
}