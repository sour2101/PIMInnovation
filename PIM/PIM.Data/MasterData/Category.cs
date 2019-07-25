using PIM.Data.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.MasterData
{
    public  class Category : Created
    {
        [Key]
        [Column(Order = 1)]
        public int Id { get; set; }

        [Required]
        public string ShortName { get; set; }
        [Required]
        public string LongName { get; set; }

        [Key]
        [Column(Order = 2)]
        public int Fk_Local { get; set; }

        public int ParentId { get; set; }
    }
}
