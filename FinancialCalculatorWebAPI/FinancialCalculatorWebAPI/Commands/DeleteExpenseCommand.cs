using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record DeleteExpenseCommand (Guid Id) : IRequest<Unit>;
    public class DeleteExpenseCommandHandler : IRequestHandler<DeleteExpenseCommand, Unit>
    {
        private readonly IExpenseRepository _expenseRepository;
        public DeleteExpenseCommandHandler(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        public async Task<Unit> Handle(DeleteExpenseCommand request, CancellationToken cancellationToken)
        {
            var expense = await _expenseRepository.GetById(request.Id);

            if (expense is not null)
            {
                expense.IsDeleted = !expense.IsDeleted;
                await _expenseRepository.Update(expense);
                return Unit.Value;
            }
            throw new ExpenseNotFoundException("Expense not found.");
        }
    }
}
