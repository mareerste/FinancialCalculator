using FinancialCalculatorWebAPI.DAContext;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;

namespace FinancialCalculatorWebAPI.Repository
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        private readonly FinancialDbContext _context;
        public CategoryRepository(FinancialDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
