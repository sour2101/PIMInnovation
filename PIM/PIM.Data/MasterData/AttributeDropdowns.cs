
namespace PIM.Data.MasterData
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class AttributeDropdowns
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int AttributeId { get; set; }

        [ForeignKey("AttributeId")]
        public virtual Attribute Attributes { get; set; }
    }
}
