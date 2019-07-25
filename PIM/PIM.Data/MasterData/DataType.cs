using System.ComponentModel.DataAnnotations;

namespace PIM.Data.MasterData
{
    public class DataType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }


    }
}
