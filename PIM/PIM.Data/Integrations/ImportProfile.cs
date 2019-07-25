namespace PIM.Data.Integrations
{
    using Common;
    using MasterData;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class ImportProfile:Created
    {
        [Key]
        public int Id { get; set; }

        public int JobTypeId { get; set; } = 1;

        public string Name { get; set; }

        public string FolderName { get; set; }

        [ForeignKey("JobTypeId")]
        public virtual JobType JobType { get; set; }

    }
}
