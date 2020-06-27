using PIM.Data.Users;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Organizations
{
    public class RoleOrgMapping
    {
        [Key]
        [Column(Order = 1)]
        public int OrgId { get; set; }

        [Key]
        [Column(Order = 2)]
        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }


        [ForeignKey("OrgId")]
        public virtual Organization Organizations { get; set; }
    }
}
