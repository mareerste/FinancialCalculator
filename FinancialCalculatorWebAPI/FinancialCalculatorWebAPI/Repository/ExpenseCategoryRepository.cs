using FinancialCalculatorWebAPI.DAContext;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;

namespace FinancialCalculatorWebAPI.Repository
{
    public class ExpenseCategoryRepository : GenericRepository<ExpenseCategory>, IExpenseCategoryRepository
    {
        private readonly FinancialDbContext _context;
        public ExpenseCategoryRepository(FinancialDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
