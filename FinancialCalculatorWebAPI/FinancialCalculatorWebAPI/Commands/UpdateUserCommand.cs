using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record UpdateUserCommand : IRequest<User>
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Mail { get; set; }
        public double CurrentBalance { get; set; }
    }
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, User>
    {
        private readonly IUserRepository _userRepository;
        public UpdateUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetById(request.UserId);
            if(user is not null)
            {
                user.BirthDate = request.BirthDate;
                user.Mail = request.Mail;
                user.CurrentBalance = request.CurrentBalance;

                return await _userRepository.Update(user);
            }
            throw new UserNotFoundException("User not found.");
        }
    }
}
