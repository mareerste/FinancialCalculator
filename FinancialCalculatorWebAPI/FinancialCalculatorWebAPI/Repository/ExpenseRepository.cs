using FinancialCalculatorWebAPI.DAContext;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinancialCalculatorWebAPI.Repository
{
    public class ExpenseRepository : GenericRepository<Expense>, IExpenseRepository
    {
        private readonly FinancialDbContext _context;
        public ExpenseRepository(FinancialDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Expense>> GetByUser(Guid userId)
        {
            return _context.Expenses.Where(e => e.UserId == userId && e.IsDeleted == false).Include(e => e.Category).OrderBy(e => e.DateTime);
        }

        public async Task<IEnumerable<Expense>> GetExpensesInMonth(int year, int month, Guid userId)
        {
            DateTime startDate = new DateTime(year, month, 1);
            DateTime endDate = startDate.AddMonths(1);

            return _context.Expenses
                .Where(expense => expense.DateTime >= startDate 
                && expense.DateTime < endDate 
                && expense.UserId == userId
                && expense.IsDeleted == false).Include(e => e.Category)
                .OrderBy(e => e.DateTime);
        }

        public async Task<IEnumerable<Expense>> GetExpensesInRange(DateTime start, DateTime end, Guid userId)
        {
            end = end.AddDays(1);

            return await _context.Expenses
                .Where(expense => expense.DateTime >= start
                    && expense.DateTime < end
                    && expense.UserId == userId
                    && !expense.IsDeleted)
                .Include(e => e.Category)
                .OrderBy(e => e.DateTime)
                .ToListAsync();
        }

        public async Task<Expense> GetByIdWithCategory(Guid expenseId)
        {
            return await _context.Expenses
                .Include(e => e.Category)
                .FirstOrDefaultAsync(e => e.ExpenseId == expenseId);
        }
    }
}
