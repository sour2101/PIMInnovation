using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Organizations
{
    public class TaxonomyOrgMapping
    {

        [Key]
        [Column(Order = 1)]
        public int OrgId { get; set; }
        [Key]
        [Column(Order = 2)]
        public int TaxonomyId { get; set; }


        [ForeignKey("OrgId")]
        public virtual Organization Organizations { get; set; }

        [ForeignKey("TaxonomyId")]
        public virtual Taxonomy Taxomony { get; set; }
    }
}
