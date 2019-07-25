using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Integrations
{
    using Common;

    public class FileDetails:Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string FileName { get; set; }

        public string SourceFileName { get; set; }

        public string DirectoryName { get; set; }

        public string FilePath { get; set; }
       
    }
}
