using PIM.Data.Users;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Organizations
{
    public class UserOrgMappings
    {
        [Key]
        [Column(Order = 1)]
        public int OrgId { get; set; }

        [Key]
        [Column(Order = 2)]
        public int UserId { get; set; }


        [ForeignKey("UserId")]
        public virtual User Users { get; set; }

        [ForeignKey("OrgId")]
        public virtual Organization Organizations { get; set; }
    }
}
