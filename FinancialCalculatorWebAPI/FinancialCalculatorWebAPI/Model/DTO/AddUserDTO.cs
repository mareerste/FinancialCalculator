using FinancialCalculatorWebAPI.Enum;
using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Model.DTO
{
    public class AddUserDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime BirthDate { get; set; }
        public string Mail { get; set; }
    }
}
