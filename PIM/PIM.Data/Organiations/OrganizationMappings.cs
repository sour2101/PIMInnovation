namespace PIM.Data.MasterData
{
    using Attributes;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Users;

    public class OrganizationMappings
    {
        [Key]
        public int Id { get; set; }

        public int OrgId { get; set; }

        public int? RoleId { get; set; }

        public int? AttributeId { get; set; }

        public int? TaxonomyId { get; set; }

        public bool Active { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role Role {get;set;}

        [ForeignKey("AttributeId")]
        public virtual Attribute Attribute { get; set; } 

        [ForeignKey("OrgId")]
        public virtual Organization Organizations { get; set; }
    }
}
