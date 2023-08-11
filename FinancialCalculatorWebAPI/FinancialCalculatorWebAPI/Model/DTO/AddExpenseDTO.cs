using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Model.DTO
{
    public class AddExpenseDTO
    {
        public DateTime DateTime { get; set; } = DateTime.Now;
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public double Value { get; set; }
        public string Username { get; set; }
    }
}
