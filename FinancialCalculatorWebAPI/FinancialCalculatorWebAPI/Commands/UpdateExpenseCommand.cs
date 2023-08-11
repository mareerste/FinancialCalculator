using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record UpdateExpenseCommand : IRequest<Expense>
    {
        public int ExpenseId { get; set; }
        public DateTime DateTime { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public double Value { get; set; }
        public string Username { get; set; }
    }
    public class UpdateExpenseCommandHandler : IRequestHandler<UpdateExpenseCommand, Expense>
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly ICategoryRepository _expenseCategoryRepository;
        private readonly IUserRepository _userRepository;
        public UpdateExpenseCommandHandler(IExpenseRepository expenseRepository, ICategoryRepository expenseCategoryRepository, IUserRepository userRepository)
        {
            _expenseRepository = expenseRepository;
            _expenseCategoryRepository = expenseCategoryRepository;
            _userRepository = userRepository;
        }

        public async Task<Expense> Handle(UpdateExpenseCommand request, CancellationToken cancellationToken)
        {
            var expense = await _expenseRepository.GetById(request.ExpenseId);
            if(expense is not null)
            {
                if (request.CategoryId != expense.CategoryId)
                    expense.Category = await _expenseCategoryRepository.GetById(request.CategoryId);
                expense.DateTime = request.DateTime;
                expense.Description = request.Description;
                expense.Value = request.Value;

                return await _expenseRepository.Update(expense);
            }
            throw new ExpenseNotFoundException("Expense not found.");
        }
    }
}
