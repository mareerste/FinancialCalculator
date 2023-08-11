using FinancialCalculatorWebAPI.Model;

namespace FinancialCalculatorWebAPI.Repository.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> GetByUsername(string username);
    }
}
