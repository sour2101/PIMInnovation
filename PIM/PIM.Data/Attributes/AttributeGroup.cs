namespace PIM.Data.Attributes
{
    using Common;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class AttributeGroup : Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }       

        public int AttrTypeId { get; set; }

        [ForeignKey("AttrTypeId")]
        public virtual AttributeType AttributeTypes { get; set; }
    }
}
