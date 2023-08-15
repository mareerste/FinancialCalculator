using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record UpdatePaymentCommand : IRequest<Payment>
    {
        public Guid PaymentId { get; set; }
        public DateTime DateTime { get; set; }
        public string Description { get; set; }
        public double Value { get; set; }

    }
    public class UpdatePaymentCommandHandler : IRequestHandler<UpdatePaymentCommand, Payment>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPaymentRepository _paymentRepository;
        public UpdatePaymentCommandHandler(IUserRepository userRepository, IPaymentRepository paymentRepository)
        {
            _userRepository = userRepository;
            _paymentRepository = paymentRepository;
        }

        public async Task<Payment> Handle(UpdatePaymentCommand request, CancellationToken cancellationToken)
        {
            var payment = await _paymentRepository.GetById(request.PaymentId);
            if (payment is not null)
            {
                var oldValue = payment.Value;
                payment.DateTime = request.DateTime;
                payment.Description = request.Description;
                payment.Value = request.Value;

                var res = await _paymentRepository.Update(payment);
                if(res.Value != oldValue)
                {
                    var user = await _userRepository.GetById(res.UserId);
                    user.CurrentBalance += res.Value - oldValue;
                    await _userRepository.Update(user);
                }
                return res;
            }
            throw new PaymentNotFoundException("Payment not found.");
        }
    }
}
