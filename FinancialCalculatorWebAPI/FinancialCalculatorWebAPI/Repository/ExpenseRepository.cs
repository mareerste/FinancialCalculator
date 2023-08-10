using FinancialCalculatorWebAPI.DAContext;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;

namespace FinancialCalculatorWebAPI.Repository
{
    public class ExpenseRepository : GenericRepository<Expense>, IExpenseRepository
    {
        private readonly FinancialDbContext _context;
        public ExpenseRepository(FinancialDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
