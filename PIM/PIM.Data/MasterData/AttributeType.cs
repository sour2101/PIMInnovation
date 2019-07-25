using PIM.Data.Common;
using System.ComponentModel.DataAnnotations;


namespace PIM.Data.MasterData
{
    public class AttributeType : Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ShortName { get; set; }
        [Required]
        public string LongName { get; set; }
    }
}
