namespace FinancialCalculatorWebAPI.Model.DTO
{
    public class UpdateExpenseDTO
    {
        public Guid ExpenseId { get; set; }
        public DateTime DateTime { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public double Value { get; set; }
    }
}
