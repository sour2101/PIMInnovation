namespace PIM.Data.MasterData
{
    using Common;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Users;

    public class Menu :Created
    {
        [Key]
        public int Id { get; set; }

       
        public int LanguageId { get; set; }

        public string Name { get; set; }

        public string Link { get; set; }

        public virtual ICollection<MenuChildrens> childrens { get; set; }

        public virtual ICollection<MenuRights> MenuRights { get; set; }

        [ForeignKey("LanguageId")]
        public virtual Locale Locales { get; set; }
    }
}
