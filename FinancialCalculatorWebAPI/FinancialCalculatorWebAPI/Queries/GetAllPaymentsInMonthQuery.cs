using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetAllPaymentsInMonthQuery(int Year, int Month, string Username) : IRequest<List<Payment>>;
    public class GetAllPaymentsInMonthQueryHandler : IRequestHandler<GetAllPaymentsInMonthQuery, List<Payment>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPaymentRepository _paymentRepository;
        public GetAllPaymentsInMonthQueryHandler(IUserRepository userRepository, IPaymentRepository paymentRepository)
        {
            _userRepository = userRepository;
            _paymentRepository = paymentRepository;
        }

        public async Task<List<Payment>> Handle(GetAllPaymentsInMonthQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUsername(request.Username);
            if (user is not null)
                return _paymentRepository.GetPaymentsInMonth(request.Year, request.Month, user.UserId).Result.ToList();
            throw new UserNotFoundException("User not found.");
        }
    }
}
