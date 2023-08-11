using FinancialCalculatorWebAPI.Enum;
using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Model
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }
        [Required]
        [StringLength(20, ErrorMessage = "The username cannot exceed 20 characters!")]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public ERole Role { get; set; } = ERole.User;
        public DateTime BirthDate { get; set; }
        [Required]
        public string Mail { get; set; }
        public double CurrentBalance { get; set; } = 0.0d;
        public bool IsDeleted { get; set; } = false;
    }
}
