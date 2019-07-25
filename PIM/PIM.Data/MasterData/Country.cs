using PIM.Data.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PIM.Data.MasterData
{
    public class Country : Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string CountryCode { get; set; }

        public ICollection<Plant> Plants { get; set; }
    }
}
