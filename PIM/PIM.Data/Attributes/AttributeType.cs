namespace PIM.Data.Attributes
{
    using Common;
    using System.ComponentModel.DataAnnotations;

    public class AttributeType : Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ShortName { get; set; }
        [Required]
        public string LongName { get; set; }
    }
}
