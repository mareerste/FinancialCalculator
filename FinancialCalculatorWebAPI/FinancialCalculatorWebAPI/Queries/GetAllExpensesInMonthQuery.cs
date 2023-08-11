using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetAllExpensesInMonthQuery (int year, int month, string username) : IRequest<List<Expense>>;
    public class GetAllExpensesInMonthQueryHandler : IRequestHandler<GetAllExpensesInMonthQuery, List<Expense>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IExpenseRepository _expenseRepository;
        public GetAllExpensesInMonthQueryHandler(IUserRepository userRepository, IExpenseRepository expenseRepository)
        {
            _userRepository = userRepository;
            _expenseRepository = expenseRepository;
        }

        public async Task<List<Expense>> Handle(GetAllExpensesInMonthQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUsername(request.username);
            if (user is not null)
                return _expenseRepository.GetExpensesInMonth(request.year, request.month, user.UserId).Result.ToList();
            throw new UserNotFoundException("User not found.");
        }
    }
}
