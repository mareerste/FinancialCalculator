using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record DeleteExpenseCommand (Guid Id) : IRequest<Unit>;
    public class DeleteExpenseCommandHandler : IRequestHandler<DeleteExpenseCommand, Unit>
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IUserRepository _userRepository;
        public DeleteExpenseCommandHandler(IExpenseRepository expenseRepository, IUserRepository userRepository)
        {
            _expenseRepository = expenseRepository;
            _userRepository = userRepository;
        }

        public async Task<Unit> Handle(DeleteExpenseCommand request, CancellationToken cancellationToken)
        {
            var expense = await _expenseRepository.GetById(request.Id);

            if (expense is not null)
            {
                expense.IsDeleted = !expense.IsDeleted;
                await _expenseRepository.Update(expense);

                var user = await _userRepository.GetById(expense.UserId);

                if (expense.IsDeleted)
                    user.CurrentBalance += expense.Value;
                    
                else
                    user.CurrentBalance -= expense.Value;

                await _userRepository.Update(user);
                return Unit.Value;
            }
            throw new ExpenseNotFoundException("Expense not found.");
        }
    }
}
