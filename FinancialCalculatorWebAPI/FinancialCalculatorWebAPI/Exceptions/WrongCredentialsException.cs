namespace FinancialCalculatorWebAPI.Exceptions
{
    public class WrongCredentialsException : Exception
    {
        public WrongCredentialsException() { }
        public WrongCredentialsException(string message) :base(message) { }
    }
}
