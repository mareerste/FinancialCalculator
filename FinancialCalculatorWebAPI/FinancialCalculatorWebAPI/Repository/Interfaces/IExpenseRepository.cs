using FinancialCalculatorWebAPI.Model;

namespace FinancialCalculatorWebAPI.Repository.Interfaces
{
    public interface IExpenseRepository : IGenericRepository<Expense>
    {
        Task<IEnumerable<Expense>> GetExpensesInMonth(int year, int month, Guid userId);
        Task<IEnumerable<Expense>> GetExpensesInRange(DateTime start, DateTime end, Guid userId);
        Task<IEnumerable<Expense>> GetByUser(Guid userId);
        Task<Expense> GetByIdWithCategory(Guid expenseId);
    }
}
