using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetExpensesByUserInDateRangeQuery(DateTime StartDate, DateTime EndDate,string Username) : IRequest<List<Expense>>;
    public class GetExpensesByUserInDateRangeQueryHandler : IRequestHandler<GetExpensesByUserInDateRangeQuery, List<Expense>>
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IUserRepository _userRepository;
        public GetExpensesByUserInDateRangeQueryHandler(IExpenseRepository expenseRepository, IUserRepository userRepository)
        {
            _expenseRepository = expenseRepository;
            _userRepository = userRepository;
        }

        public async Task<List<Expense>> Handle(GetExpensesByUserInDateRangeQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUsername(request.Username);
            if (user is not null)
                return _expenseRepository.GetExpensesInRange(request.StartDate, request.EndDate, user.UserId).Result.ToList();
            throw new UserNotFoundException("User not found.");

        }
    }
}
