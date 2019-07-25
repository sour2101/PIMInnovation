

using System.ComponentModel.DataAnnotations;

namespace PIM.API.Models
{
    public class ChangePasswordModel
    {
        [Required]
        public string ChangePasswordToken { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}