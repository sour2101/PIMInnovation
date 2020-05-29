

namespace PIM.Data.Entity
{
    using Attributes;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class EntityDetails
    {
        [Key]
        public int Id { get; set; }

        public int AttributeId { get; set; }

        public string AttributeValue { get; set; }

        public int CatalogId { get; set; }

        [ForeignKey("AttributeId")]
        public virtual List<Attribute> Attributes { get; set; }

    }
}
