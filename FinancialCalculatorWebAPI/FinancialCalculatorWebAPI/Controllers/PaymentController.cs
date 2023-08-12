using FinancialCalculatorWebAPI.Commands;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Model.DTO;
using FinancialCalculatorWebAPI.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinancialCalculatorWebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PaymentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<List<Payment>>> GetAllByUser(string username)
        {
            return await _mediator.Send(new GetAllPaymentsByUserQuery(username));
        }

        [HttpGet("{year:int}/{month:int}")]
        public async Task<ActionResult<List<Payment>>> GetAllByUser(int year, int month)
        {
            return await _mediator.Send(new GetAllPaymentsInMonthQuery(year,month, "marko123"));
        }

        [HttpPost]
        public async Task<ActionResult<Payment>> AddPayment (AddPaymentDTO paymentDTO)
        {
            var addPaymentCommand = new AddPaymentCommand
            {
                DateTime = paymentDTO.DateTime,
                Description = paymentDTO.Description,
                Username = paymentDTO.Username,
                Value = paymentDTO.Value
            };
            var res = _mediator.Send(addPaymentCommand).Result;
            if(res != null)
                return CreatedAtAction(nameof(AddPayment), res);
            return BadRequest();
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeletePayment(Guid id)
        {
            await _mediator.Send(new DeletePaymentCommand(id));
            return Ok();
        }
    }
}
