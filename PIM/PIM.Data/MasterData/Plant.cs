using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PIM.Data.Users;

namespace PIM.Data.MasterData
{
    public class Plant
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int PlantCode { get; set; }

        public int CountryId { get; set; }

        

        // Navigation properties
        [ForeignKey("CountryId")]
        public virtual Country Countries { get; set; }
    }
}
