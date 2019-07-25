

namespace PIM.Data.Integrations
{
    using MasterData;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class JobDetails
    {
        [Key]
        public int Id { get; set; }

        public string SheetName { get; set; }

        public string ErrorMessage { get; set; }

        public string RowNumber { get; set; }

        public string EntityName { get; set; }

        public string Code { get; set; }

        public int MessageTypeId { get; set; }

        public int IntegrationId { get; set; }

        [ForeignKey("IntegrationId")]
        public virtual IntegrationJob Integration { get; set; }

        [ForeignKey("MessageTypeId")]
        public virtual MessageType MessageType { get; set; }
    }
}
