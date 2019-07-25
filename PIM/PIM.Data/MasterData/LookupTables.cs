using PIM.Data.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PIM.Data.MasterData
{
    public class LookupTables : Created
    {
        [Key]
        public int Id { get; set; }

        public string TableName { get; set; }

        public virtual ICollection<LookUpColumns> Columns { get; set; }
    }
}
