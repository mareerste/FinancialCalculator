using MediatR;
using Microsoft.IdentityModel.JsonWebTokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetMyUsernameQuery(string JwtToken) : IRequest<string>;
    public class GetMyUsernameQueryHandler : IRequestHandler<GetMyUsernameQuery, string>
    {
        public GetMyUsernameQueryHandler()
        {
        }

        public async Task<string> Handle(GetMyUsernameQuery request, CancellationToken cancellationToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = tokenHandler.ReadJwtToken(request.JwtToken);

            return jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == "username")?.Value;
        }
    }
}
