using FinancialCalculatorWebAPI.DAContext;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;

namespace FinancialCalculatorWebAPI.Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly FinancialDbContext _context;
        public UserRepository(FinancialDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User> GetByUsername(string username)
        {
            return _context.Users.FirstOrDefault(u => u.Username.Equals(username));
        }
    }
}
