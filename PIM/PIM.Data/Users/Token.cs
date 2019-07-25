using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Users
{
   public class Token
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(50)]
        [Index(IsUnique = true)]
        public string Value { get; set; }

        public DateTime ExpirationDate { get; set; }

        // Navigation properties
        [Required]
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
