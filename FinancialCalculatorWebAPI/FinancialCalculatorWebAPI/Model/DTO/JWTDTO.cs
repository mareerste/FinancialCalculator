namespace FinancialCalculatorWebAPI.Model.DTO
{
    public class JWTDTO
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public DateTime ExpireDate { get; set; }
    }
}
