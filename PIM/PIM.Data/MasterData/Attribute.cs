using PIM.Data.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.MasterData
{
    public class Attribute : Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ShortName { get; set; }

        [Required]
        public string LongName { get; set; }

        public int AttributeGroupId { get; set; }

        public int DataTypeId { get; set; }

        public int DisplayTypeId { get; set; }

        public bool Required { get; set; }

        public bool ShowAtCreation { get; set; }

        public bool IsActive { get; set; }

        public bool IsLocalizable { get; set; }

        public string TableName { get; set; }

        [ForeignKey("AttributeGroupId")]
        public virtual AttributeGroup AttributeGroup{ get; set; }

        [ForeignKey("DataTypeId")]
        public virtual DataType DataTypes { get; set; }

        [ForeignKey("DisplayTypeId")]
        public virtual DisplayType DisplayTypes { get; set; }
    }
}
