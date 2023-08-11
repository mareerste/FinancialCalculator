using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetAllExpensesByUserQuery(string username) : IRequest<List<Expense>>;
    public class GetAllExpensesByUserQueryHandler : IRequestHandler<GetAllExpensesByUserQuery, List<Expense>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IExpenseRepository _expenseRepository;
        public GetAllExpensesByUserQueryHandler(IUserRepository userRepository, IExpenseRepository expenseRepository)
        {
            _userRepository = userRepository;
            _expenseRepository = expenseRepository;
        }
        public async Task<List<Expense>> Handle(GetAllExpensesByUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUsername(request.username);
            if (user is not null)
                return _expenseRepository.GetBy(e => e.UserId == user.UserId && e.IsDeleted == false).Result.ToList();
            throw new UserNotFoundException("User not found.");
        }
    }
}
