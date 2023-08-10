using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Model
{
    public class ExpenseCategory
    {
        [Key]
        public Guid CategodyId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public bool Deleted { get; set; } = false;
    }
}
