using FinancialCalculatorWebAPI.DAContext;
using FinancialCalculatorWebAPI.Model;

namespace FinancialCalculatorWebAPI.Repository
{
    public class ExpenseCategoryRepository : GenericRepository<ExpenseCategory>
    {
        private readonly FinancialDbContext _context;
        public ExpenseCategoryRepository(FinancialDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
