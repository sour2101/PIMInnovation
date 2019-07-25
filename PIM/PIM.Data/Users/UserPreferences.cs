using PIM.Data.Common;
using PIM.Data.MasterData;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Users
{
    public class UserPreferences : Created
    {
       
        [Key]
        public int UserId { get; set; }

        public int? DataLocal {get;set;}

        public string TimeZone { get; set; }

        public int? Taxonomy { get; set; }

        public int? OrganizationId { get; set; }
       
        public int? CatalogId { get; set; }
       
        public int? RoleId { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role Roles { get; set; }

        [ForeignKey("CatalogId")]
        public virtual Organization Catalogs { get; set; }

        [ForeignKey("DataLocal")]
        public virtual Language DataLocals { get; set; }


        [Key, ForeignKey("UserId")]
        public virtual User Users { get; set; }

        [ForeignKey("OrganizationId")]
        public virtual Organization Organization { get; set; }
    }
}
