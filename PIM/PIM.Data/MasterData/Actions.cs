using PIM.Data.Common;
using System.ComponentModel.DataAnnotations;

namespace PIM.Data.MasterData
{
    public class Actions 
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
