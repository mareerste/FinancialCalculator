using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record AddPaymentCommand : IRequest<Payment>
    {
        public string Description { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;
        public string Username { get; set; }
        public double Value { get; set; }
    }
    public class AddPaymentCommandHandler : IRequestHandler<AddPaymentCommand, Payment>
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IUserRepository _userRepository;
        public AddPaymentCommandHandler(IPaymentRepository paymentRepository, IUserRepository userRepository)
        {
            _paymentRepository = paymentRepository;
            _userRepository = userRepository;
        }
        public async Task<Payment> Handle(AddPaymentCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUsername(request.Username);
            if(user != null)
            {
                var payment = new Payment
                {
                    User = user,
                    DateTime = request.DateTime,
                    Description = request.Description,
                    Value = request.Value,
                };
                var retVal = await _paymentRepository.Insert(payment);
                if(retVal != null)
                {
                    var res = await UpdateUserBalance(user, retVal.Value);
                    retVal.User = res;
                }
                return retVal;
            }
            throw new UserNotFoundException("User not found.");
        }

        public async Task<User> UpdateUserBalance(User user, double value)
        {
            user.CurrentBalance += value;
            return await _userRepository.Update(user);
        }
    }
}
