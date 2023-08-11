using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record UpdateCategoryCommand : IRequest<Category>
    {
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
    }
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, Category>
    {
        private readonly ICategoryRepository _categoryRepository;
        public UpdateCategoryCommandHandler(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<Category> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            if (!string.IsNullOrEmpty(request.Name))
            {
                var category = await _categoryRepository.GetById(request.CategoryId);
                if (category != null)
                {
                    category.Name = request.Name;
                    return await _categoryRepository.Update(category);
                }
                throw new CategoryNotFoundException("Category not found.");
            }
            throw new ArgumentNullException();
                
        }
    }
}
