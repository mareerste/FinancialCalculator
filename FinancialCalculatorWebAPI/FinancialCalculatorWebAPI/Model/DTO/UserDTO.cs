using FinancialCalculatorWebAPI.Enum;
using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Model.DTO
{
    public class UserDTO
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public ERole Role { get; set; }
        public DateTime BirthDate { get; set; }
        public string Mail { get; set; }
        public double CurrentBalance { get; set; }
        public bool IsDeleted { get; set; }
    }
}
