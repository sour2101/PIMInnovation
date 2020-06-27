namespace PIM.Data.Organizations
{
    using Attributes;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class AttributeOrgMapping
    {
        [Key]
        [Column(Order = 1)]
        public int OrgId { get; set; }

        [Key]
        [Column(Order = 2)]
        public int AttributeId { get; set; }


        [ForeignKey("AttributeId")]
        public virtual Attribute Attribute { get; set; }

        [ForeignKey("OrgId")]
        public virtual Organization Organizations { get; set; }
    }
}
