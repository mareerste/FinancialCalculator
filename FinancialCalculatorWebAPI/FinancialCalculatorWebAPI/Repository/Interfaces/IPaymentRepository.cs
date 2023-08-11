using FinancialCalculatorWebAPI.Model;

namespace FinancialCalculatorWebAPI.Repository.Interfaces
{
    public interface IPaymentRepository : IGenericRepository<Payment>
    {
        Task<IEnumerable<Payment>> GetPaymentsInMonth(int year, int month, Guid userId);
    }
}
