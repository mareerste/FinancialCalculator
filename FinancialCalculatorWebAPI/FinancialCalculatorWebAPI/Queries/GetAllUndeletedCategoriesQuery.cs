using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetAllUndeletedCategoriesQuery : IRequest<List<Category>>;
    public class GetAllUndeletedCategoriesQueryHandler : IRequestHandler<GetAllUndeletedCategoriesQuery, List<Category>>
    {
        private readonly ICategoryRepository _categoryRepository;
        public GetAllUndeletedCategoriesQueryHandler(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<List<Category>> Handle(GetAllUndeletedCategoriesQuery request, CancellationToken cancellationToken)
        {
            return _categoryRepository.GetBy(c => c.IsDeleted == false).Result.ToList();
        }
    }
}
