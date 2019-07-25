using PIM.Data.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.MasterData
{
    public class AttributeGroup : Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ShortName { get; set; }
        [Required]
        public string LongName { get; set; }

        public int AttrTypeId { get; set; }

        [ForeignKey("AttrTypeId")]
        public virtual AttributeType AttributeTypes { get; set; }
    }
}
