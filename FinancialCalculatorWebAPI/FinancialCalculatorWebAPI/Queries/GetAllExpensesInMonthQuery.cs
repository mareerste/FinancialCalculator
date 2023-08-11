using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetAllExpensesInMonthQuery (int Year, int Month, string Username) : IRequest<List<Expense>>;
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
            var user = await _userRepository.GetByUsername(request.Username);
            if (user is not null)
                return _expenseRepository.GetExpensesInMonth(request.Year, request.Month, user.UserId).Result.ToList();
            throw new UserNotFoundException("User not found.");
        }
    }
}
