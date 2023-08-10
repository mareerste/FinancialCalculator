using FinancialCalculatorWebAPI.DAContext;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace FinancialCalculatorWebAPI.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly FinancialDbContext _context;
        private readonly DbSet<T> _table;
        public GenericRepository(FinancialDbContext context)
        {
            _context = context;
            _table = context.Set<T>();
        }

        public async Task Delete(T entity)
        {
            _table.Remove(entity);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _table.ToListAsync();
        }

        public async Task<IEnumerable<T>> GetBy(Expression<Func<T, bool>> lambda)
        {
            return await _table.Where(lambda).ToListAsync();
        }

        public async Task<T> GetById(object id)
        {
            return _table.Find(id);
        }

        public async Task<T> Insert(T entity)
        {
            _table.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> Update(T entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
