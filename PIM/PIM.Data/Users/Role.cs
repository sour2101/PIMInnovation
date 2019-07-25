using PIM.Data.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Users
{
    public class Role : Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [Index(IsUnique = true)]
        public string Name { get; set; }

    public string Description { get; set; }

        public bool Active { get; set; }

        public virtual ICollection<UserRights> UserRights { get; set; }
    }
}