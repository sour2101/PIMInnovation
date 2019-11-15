namespace PIM.Data.Attributes
{
    using Common;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class AttributeValues :Created
    {
        [Key]
        public int Id { get; set; }

        public int CatalogId { get; set; }

        public int AttributeId { get; set; }

        public string AttributeValue { get; set; }

        [ForeignKey("AttributeId")]
        public virtual Attribute Attributes { get; set; }



    }
}
