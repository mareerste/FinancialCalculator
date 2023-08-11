using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetAllPaymentsByUserQuery(string Username) : IRequest<List<Payment>>;
    public class GetAllPaymentsByUserQueryHandler : IRequestHandler<GetAllPaymentsByUserQuery, List<Payment>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPaymentRepository _paymentRepository;
        public GetAllPaymentsByUserQueryHandler(IUserRepository userRepository, IPaymentRepository paymentRepository)
        {
            _userRepository = userRepository;
            _paymentRepository = paymentRepository;
        }
        //TODO: remove comm
        public async Task<List<Payment>> Handle(GetAllPaymentsByUserQuery request, CancellationToken cancellationToken)
        {
            //var user = await _userRepository.GetByUsername(request.Username);
            return _paymentRepository.GetBy(p => p.User.Username.Equals(request.Username)).Result.ToList();
        }
    }
}
