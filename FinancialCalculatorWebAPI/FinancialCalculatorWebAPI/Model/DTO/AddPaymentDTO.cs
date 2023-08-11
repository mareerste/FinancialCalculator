
namespace FinancialCalculatorWebAPI.Model.DTO
{
    public class AddPaymentDTO
    {
        public string Description { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;
        public string Username { get; set; }
        public double Value { get; set; }
    }
}
