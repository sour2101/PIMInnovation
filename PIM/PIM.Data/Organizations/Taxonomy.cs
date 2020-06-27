namespace PIM.Data.Organizations
{
    using Common;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Taxonomy:Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [Index(IsUnique = true)]
        public string Name { get; set; }

        [ForeignKey("ParentTaxonomy")]
        public int? ParentId { get; set; }

        public virtual Taxonomy ParentTaxonomy { get; set; }

        public virtual ICollection<Taxonomy> Children { get; set; }
    }
}
