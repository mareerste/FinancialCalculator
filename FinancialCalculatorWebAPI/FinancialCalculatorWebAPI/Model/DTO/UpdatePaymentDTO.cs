using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Model.DTO
{
    public class UpdatePaymentDTO
    {
        public Guid PaymentId { get; set; }
        public string Description { get; set; }
        public DateTime DateTime { get; set; }
        public double Value { get; set; } 
    }
}
