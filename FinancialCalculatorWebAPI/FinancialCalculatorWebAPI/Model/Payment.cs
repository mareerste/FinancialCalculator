using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Model
{
    public class Payment
    {
        [Key]
        public Guid PaymentId { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime DateTime { get; set; } = DateTime.Now;
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public User User { get; set; }
        [Required]
        public double Value { get; set; } = 0.0d;
        public bool IsDeleted { get; set; } = false;
    }
}
