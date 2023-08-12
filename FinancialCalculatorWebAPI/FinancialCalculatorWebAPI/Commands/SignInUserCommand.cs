using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Model.DTO;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FinancialCalculatorWebAPI.Commands
{
   
    public record SignInUserCommand(string Username, string Password) : IRequest<JWTDTO>;
    public class SignInUserCommandHandler : IRequestHandler<SignInUserCommand, JWTDTO>
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        public SignInUserCommandHandler(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<JWTDTO> Handle(SignInUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUsername(request.Username);
            if(user != null)
            {
                if (user.IsDeleted)
                    throw new WrongCredentialsException("User's account has been deleted.");

                var verified = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
                if (verified)
                {
                    // return JWT
                    var authClaims = new List<Claim>
                    {
                        new(JwtRegisteredClaimNames.Sub, user.Username),
                        new("role", user.Role.ToString()),
                    };
                    var token = GenerateToken(authClaims);

                    //return new JwtSecurityTokenHandler().WriteToken(token);
                    return (new JWTDTO
                    {
                        Token = new JwtSecurityTokenHandler().WriteToken(token),
                        Username = user.Username,
                        Role = user.Role.ToString(),
                        ExpireDate = token.ValidTo
                    });
                }
                    
                return null;
            }
            throw new WrongCredentialsException("Incorrect username or password.");
        }

        private JwtSecurityToken GenerateToken(List<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
               issuer: _configuration["JWT:ValidIssuer"],
               audience: _configuration["JWT:ValidAudience"],
               expires: DateTime.Now.AddHours(3),
               claims: claims,
               signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
               );

            return token;
        }
    }
}
