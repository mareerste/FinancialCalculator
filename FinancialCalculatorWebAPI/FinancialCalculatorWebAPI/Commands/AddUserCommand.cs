using FinancialCalculatorWebAPI.Enum;
using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace FinancialCalculatorWebAPI.Commands
{
    public record AddUserCommand : IRequest<User>
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime BirthDate { get; set; }
        public string Mail { get; set; }
    }
    public class AddUserCommandHandler : IRequestHandler<AddUserCommand, User>
    {
        private readonly IUserRepository _userRepository;
        public AddUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> Handle(AddUserCommand request, CancellationToken cancellationToken)
        {
            var newUser = new User
            {
                Username = request.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                BirthDate = request.BirthDate,
                Mail = request.Mail,
                Role = ERole.User,
                CurrentBalance = 0.0d,
                IsDeleted = false,
            };
            if(await IsValid(newUser, request.Password))
            {
                return await _userRepository.Insert(newUser);
            }
            throw new ArgumentOutOfRangeException();
        }
        public async Task<bool> IsValid (User user, string pw)
        {
            if (!string.IsNullOrEmpty(user.Username) && 
                !string.IsNullOrEmpty(pw) && 
                !string.IsNullOrEmpty(user.Mail) && 
                user.BirthDate < DateTime.Now)
            {
                var userExist = await _userRepository.GetByUsername(user.Username);
                if (userExist != null)
                {
                    if (userExist.IsDeleted)
                        throw new WrongCredentialsException("User's account has been deleted.");
                    throw new WrongCredentialsException("User account with same username already exist.");
                }
                return true;
            }
                
            return false;
        }
    }
}
