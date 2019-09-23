namespace PIM.Data.MasterData
{
    using System.ComponentModel.DataAnnotations;

    public class UOMType
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
