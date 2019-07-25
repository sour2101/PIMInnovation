using System.ComponentModel.DataAnnotations;

namespace PIM.Data.Integrations
{
    public class IntegrationStatus
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

    }
}
