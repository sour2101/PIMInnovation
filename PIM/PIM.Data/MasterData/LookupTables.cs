namespace PIM.Data.MasterData
{
    using Common;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class LookupTables : Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<LookUpColumns> Columns { get; set; }
    }
}
