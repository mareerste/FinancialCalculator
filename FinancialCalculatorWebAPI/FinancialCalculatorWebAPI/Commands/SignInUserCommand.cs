using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
   
    public record SignInUserCommand(string Username, string Password) : IRequest<User>;
    public class SignInUserCommandHandler : IRequestHandler<SignInUserCommand, User>
    {
        private readonly IUserRepository _userRepository;
        public SignInUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> Handle(SignInUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUsername(request.Username);
            if(user != null)
            {
                if (user.IsDeleted)
                    throw new WrongCredentialsException("User's account has been deleted.");

                var verified = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
                if (verified)
                    return user;
                throw new WrongCredentialsException("Incorrect username or password.");
            }
            throw new WrongCredentialsException("Incorrect username or password.");
        }
    }
}
