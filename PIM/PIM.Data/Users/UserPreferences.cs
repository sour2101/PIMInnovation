using PIM.Data.Common;
using PIM.Data.MasterData;
using PIM.Data.Organizations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Users
{
    public class UserPreferences : Created
    {
       
        [Key]
        public int UserId { get; set; }

        public int? LocaleId {get;set;}

        public string TimeZone { get; set; }

        public int? TaxonomyId { get; set; }

        public int? OrganizationId { get; set; }
       
       
        public int? RoleId { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role Roles { get; set; }


        [ForeignKey("LocaleId")]
        public virtual Locale Locales { get; set; }

        [Key, ForeignKey("UserId")]
        public virtual User Users { get; set; }

        [ForeignKey("OrganizationId")]
        public virtual Organization Organization { get; set; }

        [ForeignKey("TaxonomyId")]
        public virtual Taxonomy Taxonomy { get; set; }
    }
}
