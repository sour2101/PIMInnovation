using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Entity
{
    public class Entity
    {
        [Key]
        public int Id { get; set; }

        public int AttributeId { get; set; }

        public string AttributeValue { get; set; }

        public int CatalogId { get; set; }

        [ForeignKey("AttributeId")]
        public virtual List<MasterData.Attribute> Attributes { get; set; }

    }
}
