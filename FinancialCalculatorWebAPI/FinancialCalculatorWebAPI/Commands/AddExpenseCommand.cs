using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Commands
{
    public record AddExpenseCommand : IRequest<Expense>
    {
        public DateTime DateTime { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public double Value { get; set; }        
        public string Username { get; set; }
    }
    public class AddExpenseCommandHandler : IRequestHandler<AddExpenseCommand, Expense>
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly ICategoryRepository _expenseCategoryRepository;
        private readonly IUserRepository _userRepository;
        public AddExpenseCommandHandler(IExpenseRepository expenseRepository, ICategoryRepository expenseCategoryRepository, IUserRepository userRepository)
        {
            _expenseRepository = expenseRepository;
            _expenseCategoryRepository = expenseCategoryRepository;
            _userRepository = userRepository;
        }

        public async Task<Expense> Handle(AddExpenseCommand request, CancellationToken cancellationToken)
        {
            User user = await _userRepository.GetByUsername(request.Username);
            Category category;
            if(user is not null)
            {
                category = await _expenseCategoryRepository.GetById(request.CategoryId);
                if(category is not null)
                {
                    var expense = new Expense
                    {
                        Category = category,
                        DateTime = request.DateTime,
                        Description = request.Description,
                        User = user,
                        Value = request.Value,
                        IsDeleted = false,
                    };
                    return await _expenseRepository.Insert(expense);
                }
                throw new CategoryNotFoundException("Provided category doesn't exist");
            }
            throw new UserNotFoundException("User not found.");

        }
    }
}
