namespace PIM.Data.Attributes
{
    using MasterData;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class AttributeCatalog
    {
        [Key]
        [Column(Order = 1)]
        public int AttributeId { get; set; }

        [Key]
        [Column(Order = 2)]
        public int CatalogId { get; set; }

        // Navigation properties
        [ForeignKey("AttributeId")]
        public virtual Attribute Attribute { get; set; }

        [ForeignKey("CatalogId")]
        public virtual Organization Organization { get; set; }

    }
}
