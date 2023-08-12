using FinancialCalculatorWebAPI.Commands;
using FinancialCalculatorWebAPI.Model.DTO;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinancialCalculatorWebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AuthenticateController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserLoginDTO user)
        {
            var token = await _mediator.Send(new SignInUserCommand(user.Username, user.Password));
            if (token != null)
                return Ok(token);
            return Unauthorized();
        }
    }
}
