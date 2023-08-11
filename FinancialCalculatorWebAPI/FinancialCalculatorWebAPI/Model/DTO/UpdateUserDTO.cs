namespace FinancialCalculatorWebAPI.Model.DTO
{
    public class UpdateUserDTO
    {
        public Guid UserId { get; set; }
        public DateTime BirthDate { get; set; }
        public string Mail { get; set; }
        public double CurrentBalance { get; set; }
    }
}
