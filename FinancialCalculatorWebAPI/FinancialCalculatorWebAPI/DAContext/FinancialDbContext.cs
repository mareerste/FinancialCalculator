using FinancialCalculatorWebAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FinancialCalculatorWebAPI.DAContext
{
    public class FinancialDbContext : DbContext
    {
        public FinancialDbContext(DbContextOptions option) : base(option)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }
        public DbSet<Expense> Expenses { get; set; }
    }
}
