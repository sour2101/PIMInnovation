namespace PIM.Data.MasterData
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class UOM
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public int UomTypeId { get; set; }

        [ForeignKey("UomTypeId")]
        public virtual UOMType UOMTypes { get; set; }
    }
}
