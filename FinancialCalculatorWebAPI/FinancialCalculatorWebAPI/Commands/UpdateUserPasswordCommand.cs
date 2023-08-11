using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;
using Microsoft.IdentityModel.Tokens;

namespace FinancialCalculatorWebAPI.Commands
{
    public record UpdateUserPasswordCommand : IRequest<User>
    {
        public string Username { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
    public class UpdateUserPasswordCommandHandler : IRequestHandler<UpdateUserPasswordCommand, User>
    {
        private readonly IUserRepository _userRepository;
        public UpdateUserPasswordCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<User> Handle(UpdateUserPasswordCommand request, CancellationToken cancellationToken)
        {
            
            if (!string.IsNullOrEmpty(request.OldPassword) && !string.IsNullOrEmpty(request.NewPassword))
            {
                var user = await _userRepository.GetByUsername(request.Username);
                if (user is not null)
                {                    
                    if(BCrypt.Net.BCrypt.Verify(request.OldPassword, user.Password))
                    {
                        user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                        return await _userRepository.Update(user);
                    }
                    throw new WrongCredentialsException("Incorrect confirmation password.");
                }
                throw new UserNotFoundException("User's not found");
            }
            throw new WrongCredentialsException("Please provide both old and new passwords.");
            
            
        }
    }
}
