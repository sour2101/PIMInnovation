using PIM.Data.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.MasterData
{
    public class LookUpColumns : Created
    {
        [Key]
        public int Id { get; set;}

        public int TableId { get; set; }

        public string ColumnName { get; set; }

        public string DataType { get; set; }
        public int length { get; set; }

        public bool Nullable { get; set; }

        public bool Unique { get; set; }

        [ForeignKey("TableId")]
        public virtual LookupTables Table { get; set; }
    }
}
