namespace PIM.Data.Attributes
{
    using MasterData;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class AttributeUOM
    {
        [Key]
        [Column(Order = 2)]
        public int? UomId { get; set; }

        [Key]
        [Column(Order = 1)]
        public int? AttributeId { get; set; }

        [ForeignKey("UomId")]
        public virtual UOM Uoms{ get; set; }

        [ForeignKey("AttributeId")]
        public virtual Attribute Attributes { get; set; }
    }
}
