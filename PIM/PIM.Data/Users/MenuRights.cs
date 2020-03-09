using PIM.Data.MasterData;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Users
{

    public class MenuRights
    {
        [Key]
        [Column(Order = 1)]
        public int RoleId { get; set; }

        [Key]
        [Column(Order = 2)]
        public int MenuId { get; set; }

        [Key]
        [Column(Order = 3)]
        public int? SubMenuId { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role Roles { get; set; }

        [ForeignKey("MenuId")]
        public virtual Menu Menus { get; set; }

        [ForeignKey("SubMenuId")]
        public virtual MenuChildrens SubMenu { get; set; }

    }
}
