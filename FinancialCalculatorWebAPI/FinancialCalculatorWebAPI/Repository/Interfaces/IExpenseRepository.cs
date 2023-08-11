using FinancialCalculatorWebAPI.Model;

namespace FinancialCalculatorWebAPI.Repository.Interfaces
{
    public interface IExpenseRepository : IGenericRepository<Expense>
    {
        Task<IEnumerable<Expense>> GetExpensesInMonth(int year, int month, Guid userId);
        Task<IEnumerable<Expense>> GetByUser(Guid userId);
    }
}
