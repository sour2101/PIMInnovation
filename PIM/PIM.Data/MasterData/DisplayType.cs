using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.MasterData
{
    public class DisplayType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int DataTypeId { get; set; }

        [ForeignKey("DataTypeId")]
        public virtual DataType DataTypes{ get; set; }
    }
}
