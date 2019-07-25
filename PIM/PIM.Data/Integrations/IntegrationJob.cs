using PIM.Data.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Integrations
{
    public class IntegrationJob:Created
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        
        public int ProfileId { get; set; }

        public int StatusId { get; set; }

        public string Description { get; set; }

        public int Processed { get; set; }

        public int Success { get; set; }

        public int Failed { get; set; }

        [ForeignKey("ProfileId")]
        public virtual ImportProfile ImportProfiles { get; set; }

        [ForeignKey("StatusId")]
        public virtual IntegrationStatus IntegrationStatus { get; set; }
    }
}
