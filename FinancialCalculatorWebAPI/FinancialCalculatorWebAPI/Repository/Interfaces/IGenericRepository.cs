using System.Linq.Expressions;

namespace FinancialCalculatorWebAPI.Repository.Interfaces
{
    public interface IGenericRepository<T>
    {
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetBy(Expression<Func<T,bool>>lambda);
        Task<T> GetById(Object id);
        Task<T>Insert(T entity);
        Task<T>Update(T entity);
        Task Delete(T entity);
    }
}
