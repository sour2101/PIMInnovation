namespace PIM.API.ExcelImportControllers
{
    using System.Linq;
    using System.Collections.Generic;
    using NPOI.SS.UserModel;
    using Controllers;
    using Data.MasterData;
    using ExcelExport;
    using Models;
    using System.Data.SqlClient;
    using NPOI.XSSF.UserModel;
    using Data.Integrations;
    using Data.Enums;
    using System;

    public class InsertLookupSheet : AbstractController
    {
        private List<MetaData> meta = new List<MetaData>();

        private JobDetails job = new JobDetails();

        private List<ColumnModel> columnModel;

        private List<ColumnModel> rowDetails;

        private int success = 0;
        private int failed = 0;
        private int error = 0;
        private int proccessed = 0;

        private AbstractDataImport import = new AbstractDataImport();
        public void LookupInsert(XSSFWorkbook hssfwb, FileDetails file)
        {
            success = 0;
            failed = 0;
            error = 0;
            proccessed = 0;
            //insert the integration data
            IntegrationJob integration = new IntegrationJob();
            integration.StatusId = (int)IntegrationStatusEnum.Queue;
            integration.ProfileId = Repository.FindBy<ImportProfile>(p => p.Name.Contains("Default Lookup Profile")).Select(p => p.Id).SingleOrDefault();
            integration.Name = "Import Job Created At " + DateTime.Now;
            integration.Description = GetDescription(integration);
            integration.CreatedBy = file.CreatedBy;
            integration.CreatedDate = file.CreatedDate;
            //job in queue
            InsertIntegrationJob(integration); 

            List<LookupTables> sheetNames = GetSheetNames();
            ISheet sheet = hssfwb.GetSheetAt(0);
            if (sheet.SheetName.ToLower() == "metadata")
            {
                for (int sheetCount = 1; sheetCount <= sheet.LastRowNum; sheetCount++)
                {
                    if (sheet.GetRow(sheetCount) != null)
                    {
                        string sheetName = sheet.GetRow(sheetCount).GetCell(0).ToString();
                        if (sheet.GetRow(sheetCount).GetCell(1).ToString() == "Yes")
                        {
                            ISheet tableSheet = hssfwb.GetSheet(sheetName);
                            //check if meta data sheet is present in workbook or not
                            if (tableSheet != null)
                            {
                                proccessed++;
                                integration.Processed = proccessed;
                                //check if lookup present in database or not
                                if (sheetNames.Any(t => t.TableName.ToLower() == sheetName.ToLower()))
                                {
                                    var tableDetails = sheetNames.Where(t => t.TableName.ToLower() == sheetName.ToLower()).FirstOrDefault();
                                    var uniqueCol = tableDetails.Columns.Where(u => u.Unique).Select(u => u.ColumnName).SingleOrDefault();
                                    for (int row = 0; row <= tableSheet.LastRowNum; row++)
                                    {
                                        if (tableSheet.GetRow(row) != null)
                                        {
                                            //To get the header row
                                            if (row == 0)
                                            {
                                                columnModel = import.GetHeader(tableDetails.Columns, tableSheet.GetRow(row), uniqueCol);
                                                //check unique column and match column with the database table
                                                if (!string.IsNullOrEmpty(import.errorMessge))
                                                {
                                                    failed++;
                                                    integration.StatusId = (int)IntegrationStatusEnum.Running;
                                                    integration.Failed = failed;
                                                    integration.Description = GetDescription(integration);
                                                    integration.ModifiedDate = DateTime.Now;
                                                    InsertIntegrationJob(integration);
                                                    // to insert the errors in job details 
                                                    job.MessageTypeId = (int)EnumMessageType.Error;
                                                    job.SheetName = sheetName;
                                                    job.ErrorMessage = import.errorMessge;
                                                    job.IntegrationId = integration.Id;
                                                    job.RowNumber = row.ToString();
                                                    InsertJobDetails(job);
                                                    break;
                                                }
                                            }
                                            else
                                            {
                                                rowDetails = new List<ColumnModel>();
                                                rowDetails = import.GetRow(columnModel, tableSheet.GetRow(row));
                                                string query = string.Empty;
                                                //if record exists then update else insert
                                                if (import.Exists(rowDetails, tableDetails))
                                                    query = import.UpdateQuery(rowDetails, tableDetails);
                                                else
                                                    query = import.InsertQuery(rowDetails, tableDetails);

                                                try
                                                {
                                                    // to insert the lookup data
                                                    var result = Repository.Context.Database.ExecuteSqlCommand(query, new SqlParameter("@tableName", tableDetails.TableName));
                                                    integration.StatusId = (int)IntegrationStatusEnum.Running;
                                                    integration.Success = success;
                                                    integration.Description = GetDescription(integration);
                                                    integration.ModifiedDate = DateTime.Now;
                                                }
                                                catch (Exception ex)
                                                {
                                                    failed++;
                                                    job = new JobDetails();
                                                    integration.StatusId = (int)IntegrationStatusEnum.Error;
                                                    integration.Failed = failed;
                                                    integration.Description = GetDescription(integration);
                                                    integration.ModifiedDate = DateTime.Now;

                                                    // to insert the errors in job details 
                                                    job.MessageTypeId = (int)EnumMessageType.Error;
                                                    job.SheetName =sheetName;
                                                    job.ErrorMessage = ex.Message;
                                                    job.IntegrationId = integration.Id;
                                                    job.RowNumber = sheetCount.ToString();
                                                    InsertJobDetails(job);

                                                }

                                                InsertIntegrationJob(integration);
                                            }
                                        }
                                    }

                                    if (failed == 0)
                                        integration.Success = (success + 1);
                                    InsertIntegrationJob(integration);
                                }
                                else
                                {
                                    integration.StatusId = (int)IntegrationStatusEnum.Error;
                                    integration.Description = "Lookup " + sheetName + " is not present in the DataBase ";
                                    // to insert the errors in job details 
                                    job.MessageTypeId = (int)EnumMessageType.Error;
                                    job.SheetName = sheet.SheetName;
                                    job.ErrorMessage = integration.Description;
                                    job.IntegrationId = integration.Id;
                                    job.RowNumber = sheetCount.ToString();
                                    InsertJobDetails(job);
                                }
                            }
                            else
                            {
                                integration.StatusId = (int)IntegrationStatusEnum.CompleteWithError;
                                integration.Description = "Sheet " + sheetName + " is not present in  file " + file.FileName;
                                // to insert the errors in job details 
                                job.MessageTypeId = (int)EnumMessageType.Error;
                                job.SheetName = sheet.SheetName;
                                job.ErrorMessage = integration.Description;
                                job.IntegrationId = integration.Id;
                                job.RowNumber = sheetCount.ToString();
                                InsertJobDetails(job);
                            }
                        }                        
                        //meta.Add(new MetaData { SheetName = sheet.GetRow(row).GetCell(0).ToString(), Load = sheet.GetRow(row).GetCell(1).ToString() });
                    }
                }

                integration.StatusId = failed == 0 ? (int)IntegrationStatusEnum.Completed : (int)IntegrationStatusEnum.CompleteWithError;
                InsertIntegrationJob(integration); ;
            }
            else
            {
                integration.StatusId = (int)IntegrationStatusEnum.Error;
                integration.Description = "MetaData Sheet is missing or it's not the first sheet";
                integration.ModifiedDate = DateTime.Now;
                InsertIntegrationJob(integration);
            }
        }

        public string GetDescription(IntegrationJob profile)
        {
            return "Total " + proccessed + " Lookup proccessed. Successful " + profile.Success + " and  Failed " + profile.Failed;
        }

        private List<LookupTables> GetSheetNames()
        {
            return Repository.GetAll<LookupTables>().ToList();

        }

        private bool InsertIntegrationJob(IntegrationJob profile)
        {
            if (profile.Id == 0)
                Repository.Add(profile);
            else
                Repository.Update(profile);
            return Repository.Save();
        }

        private bool InsertJobDetails(JobDetails jobs)
        {
            Repository.Add(jobs);
            return Repository.Save();
        }
    }
}