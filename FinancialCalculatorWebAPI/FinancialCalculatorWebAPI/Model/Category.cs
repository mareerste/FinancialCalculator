using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Model
{
    public class Category
    {
        [Key]
        public Guid CategoryId { get; set; }
        [Required]
        
        public string Name { get; set; }
        [Required]
        public bool IsDeleted { get; set; } = false;
    }
}
