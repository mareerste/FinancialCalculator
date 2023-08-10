using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetAllExpensesQuery : IRequest<List<Expense>>;
    public class GetAllExpensesQueryHandler : IRequestHandler<GetAllExpensesQuery, List<Expense>>
    {
        private readonly IExpenseRepository _expenseRepository;
        public GetAllExpensesQueryHandler(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        public async Task<List<Expense>> Handle(GetAllExpensesQuery request, CancellationToken cancellationToken)
        {
            var res = await _expenseRepository.GetAll();
            return res.ToList();
        }
    }
}
