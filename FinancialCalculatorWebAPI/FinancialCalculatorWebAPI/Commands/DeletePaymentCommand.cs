using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record DeletePaymentCommand(Guid Id) : IRequest<Unit>;
    public class DeletePaymentCommandHandler : IRequestHandler<DeletePaymentCommand, Unit>
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IUserRepository _userRepository;
        public DeletePaymentCommandHandler(IPaymentRepository paymentRepository, IUserRepository userRepository)
        {
            _paymentRepository = paymentRepository;
            _userRepository = userRepository;
        }

        public async Task<Unit> Handle(DeletePaymentCommand request, CancellationToken cancellationToken)
        {
            var payment = await _paymentRepository.GetById(request.Id);
            if(payment != null)
            {
                payment.IsDeleted = true;
                await _paymentRepository.Update(payment);

                var user = await _userRepository.GetById(payment.UserId);
                await UpdateUserBalance(user, payment.Value);
                return Unit.Value;
            }
            throw new PaymentNotFoundException("Payment not found.");
        }
        public async Task<User> UpdateUserBalance(User user, double value)
        {
            user.CurrentBalance -= value;
            return await _userRepository.Update(user);
        }
    }
}
