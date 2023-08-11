using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record DeleteCategoryCommand(Guid CategoryId) : IRequest<Unit>;
    public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, Unit>
    {
        private readonly ICategoryRepository _categoryRepository;
        public DeleteCategoryCommandHandler(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _categoryRepository.GetById(request.CategoryId);
            if(category != null)
            {
                category.IsDeleted = !category.IsDeleted;
                await _categoryRepository.Update(category);
                return Unit.Value;

            }
            throw new CategoryNotFoundException("Category not found");
        }
    }
}
