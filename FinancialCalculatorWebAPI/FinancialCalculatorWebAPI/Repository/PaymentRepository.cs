using FinancialCalculatorWebAPI.DAContext;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinancialCalculatorWebAPI.Repository
{
    public class PaymentRepository : GenericRepository<Payment>, IPaymentRepository
    {
        private readonly FinancialDbContext _context;
        public PaymentRepository(FinancialDbContext context): base(context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Payment>> GetPaymentsInMonth(int year, int month, Guid userId)
        {
            DateTime startDate = new DateTime(year, month, 1);
            DateTime endDate = startDate.AddMonths(1);

            return _context.Payments
                .Where(payment => payment.DateTime >= startDate
                && payment.DateTime < endDate
                && payment.UserId == userId
                && payment.IsDeleted == false);
        }
    }
}
