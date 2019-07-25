using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace PIM.Data.Users
{
    public class User : IIdentity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Firstname { get; set; }

        [Required]
        [StringLength(50)]
        public string Lastname { get; set; }

        [Required]
        [StringLength(200)]
        public string Email { get; set; }

        public bool Active { get; set; }

        [Required]
        [StringLength(50)]
        [Index(IsUnique = true)]
        public string Username { get; set; }

        public string Password { get; set; }

        public int ManagerId { get; set; }
        public int LanguageId { get; set; }


        public bool Sso { get; set; }

        // Navigation properties
        public virtual Token Token { get; set; }

        [ForeignKey("LanguageId")]
        public virtual Language Languages { get; set; }

        public bool Disabled { get; set; }

        public virtual ICollection<UserRights> UserRights { get; set; }

        // IIdentity
        public string Name => Username;
        public string AuthenticationType => null;
        public bool IsAuthenticated => true;
    }
}