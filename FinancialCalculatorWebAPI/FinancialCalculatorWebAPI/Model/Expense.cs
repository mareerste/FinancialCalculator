using FinancialCalculatorWebAPI.Enum;
using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Model
{
    public class Expense
    {
        [Key]
        public Guid ExpenseId { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;
        [Required]
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        [Required]
        public Category Category { get; set; }
        [Required]
        public double Value { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
