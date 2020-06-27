namespace PIM.Data.Attributes
{
    using Common;
    using Entity;
    using MasterData;
    using Organizations;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

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

        public bool IsCollection { get; set; }

        public string DefaultUOM { get; set; }

        public int? LookupTableId { get; set; }

        public int? UomTypeId { get; set; }


        [ForeignKey("AttributeGroupId")]
        public virtual AttributeGroup AttributeGroup { get; set; }       

        [ForeignKey("DataTypeId")]
        public virtual MasterData.DataType DataTypes { get; set; }

        [ForeignKey("DisplayTypeId")]
        public virtual DisplayType DisplayTypes { get; set; }

        [ForeignKey("UomTypeId")]
        public virtual UOMType UomTypes { get; set; }

        public virtual List<AttributeLookup> AttributeLookups { get; set; }

        public virtual List<AttributeDropdowns> AttributeDropdowns { get; set; }

        public virtual List<AttributeUOM> AttributeUOMs { get; set; }

        public virtual List<EntityDetails> EntityDetails { get; set; }

        public virtual ICollection<AttributeOrgMapping> AttributeOrgMappings { get; set; }
    }
}
