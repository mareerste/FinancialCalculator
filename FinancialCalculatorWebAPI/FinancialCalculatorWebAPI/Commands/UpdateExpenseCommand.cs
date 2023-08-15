using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record UpdateExpenseCommand : IRequest<Expense>
    {
        public Guid ExpenseId { get; set; }
        public DateTime DateTime { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public double Value { get; set; }        
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
                var oldValue = expense.Value;
                expense.DateTime = request.DateTime;
                expense.Description = request.Description;
                expense.Value = request.Value;

                var res = await _expenseRepository.Update(expense);
                if(res.Value != oldValue)
                {
                    
                    var user = await _userRepository.GetById(expense.UserId);
                    user.CurrentBalance -= res.Value - oldValue;
                    await _userRepository.Update(user);
                }
                return res;
            }
            throw new ExpenseNotFoundException("Expense not found.");
        }
    }
}
