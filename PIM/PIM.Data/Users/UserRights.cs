﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PIM.Data.Users
{
    public class UserRights 
    {
        [Key]
        [Column(Order = 1)]
        public int RoleId { get; set; }

        [Key]
        [Column(Order = 2)]
        public int UserId { get; set; }

        // Navigation properties
        [ForeignKey("RoleId")]
        public virtual Role Roles { get; set; }

        [ForeignKey("UserId")]
        public virtual User Users { get; set; }
    }
}