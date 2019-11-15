namespace PIM.Data.Attributes
{
    using MasterData;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class AttributeLookup
    {
        [Key]
        [Column(Order = 1)]
        public int? AttributeId { get; set; }

        [Key]
        [Column(Order = 2)]
        public int? LookupTableId { get; set; }

        [Key]
        [Column(Order = 3)]
        public int? LookupColumnId { get; set; }

        [ForeignKey("AttributeId")]
        public virtual Attribute Attributes { get; set;}

        [ForeignKey("LookupTableId")]
        public virtual LookupTables LookupTables { get; set; }

       
        [ForeignKey("LookupColumnId")]
        public virtual LookUpColumns LookupColumns { get; set; }
    }
}
