using FinancialCalculatorWebAPI.DAContext;
using FinancialCalculatorWebAPI.Model;

namespace FinancialCalculatorWebAPI.Repository
{
    public class UserRepository : GenericRepository<User>
    {
        private readonly FinancialDbContext _context;
        public UserRepository(FinancialDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
