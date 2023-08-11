using Azure.Core;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Commands
{
    public record AddCategoryCommand : IRequest<Category>
    {
        public string Name { get; set; }
        //public bool IsDeleted { get; set; } = false;
    }
    public class AddCategoryCommandHandler : IRequestHandler<AddCategoryCommand, Category>
    {
        private readonly ICategoryRepository _expenseCategoryRepository;
        public AddCategoryCommandHandler(ICategoryRepository expenseCategoryRepository)
        {
            _expenseCategoryRepository = expenseCategoryRepository;
        }

        public async Task<Category> Handle(AddCategoryCommand request, CancellationToken cancellationToken)
        {
            if (IsValid(request.Name))
            {
                var categoryExist = await _expenseCategoryRepository.GetBy(e => e.Name.Equals(request.Name));
                if (!categoryExist.Any())
                {
                    var retVal = new Category
                    {
                        Name = request.Name,
                        IsDeleted = false,
                    };
                    return await _expenseCategoryRepository.Insert(retVal);
                }
                throw new Exception("Category with this name already exist.");
            }
            throw new ArgumentNullException();
            
        }

        public bool IsValid(string name)
        {
            return !string.IsNullOrEmpty(name);
        }
    }
}
