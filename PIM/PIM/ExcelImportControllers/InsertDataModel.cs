namespace PIM.API.ExcelImportControllers
{
    using Controllers;
    using Data.Enums;
    using NPOI.XSSF.UserModel;
    using Data.Integrations;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class InsertDataModel : AbstractController
    {
        private int success = 0;
        private int failed = 0;
        private int error = 0;
        private int proccessed = 0;

        public void DataModelInsert(XSSFWorkbook hssfwb, FileDetails file)
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
        }

        public string GetDescription(IntegrationJob profile)
        {
            return "Total " + proccessed + " Lookup proccessed. Successful " + profile.Success + " and  Failed " + profile.Failed;
        }

        private bool InsertIntegrationJob(IntegrationJob profile)
        {
            if (profile.Id == 0)
                Repository.Add(profile);
            else
                Repository.Update(profile);
            return Repository.Save();
        }

    }
}