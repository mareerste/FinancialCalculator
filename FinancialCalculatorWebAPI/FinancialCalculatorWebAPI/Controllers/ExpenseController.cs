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
    public class ExpenseController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ExpenseController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<List<Expense>>> GetAllByUser(string username)
        {
            string jwtToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var usernameJwt = _mediator.Send(new GetMyUsernameQuery(jwtToken)).Result;

            if (!username.Equals(usernameJwt))
                return Unauthorized();
            return Ok(await _mediator.Send(new GetAllExpensesByUserQuery(username)));
        }
        [HttpGet("{year:int}/{month:int}")]
        public async Task<ActionResult<List<Expense>>> GetExpensesInMonth(int year, int month)
        {
            string jwtToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var username = _mediator.Send(new GetMyUsernameQuery(jwtToken)).Result;

            if (username == null)
                return Unauthorized();

            var GetAllExpensesInMonthQuery = new GetAllExpensesInMonthQuery(year, month, username);

            var res = await _mediator.Send(GetAllExpensesInMonthQuery);
            if (res != null)
                return Ok(res);
            return BadRequest();
        }
        [HttpGet("range/{startDate}/{endDate}")]
        public async Task<ActionResult<List<Expense>>> GetExpensesByDateRange (DateTime startDate, DateTime endDate){
            string jwtToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var username = _mediator.Send(new GetMyUsernameQuery(jwtToken)).Result;

            if (username == null)
                return Unauthorized();

            var res = await _mediator.Send(new GetExpensesByUserInDateRangeQuery(startDate, endDate, username));
            if (res != null)
                return Ok(res);
            return BadRequest();
        }


        [HttpPost]
        public async Task<ActionResult<Expense>> AddExpense (AddExpenseDTO expenseDTO)
        {
            string jwtToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var username = _mediator.Send(new GetMyUsernameQuery(jwtToken)).Result;

            if (!username.Equals(expenseDTO.Username))
                return Unauthorized();

            var AddExpenseCommand = new AddExpenseCommand
            {
                Description = expenseDTO.Description,
                CategoryId = expenseDTO.CategoryId,
                DateTime = expenseDTO.DateTime,
                Username = expenseDTO.Username,
                Value = expenseDTO.Value,
            };
            var expense = await _mediator.Send(AddExpenseCommand);
            if (expense != null)
                return Ok(expense);
            return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<Exception>> UpdateExpense (UpdateExpenseDTO expense)
        {
            var updateExpenseCommand = new UpdateExpenseCommand
            {
                CategoryId = expense.CategoryId,
                DateTime = expense.DateTime,
                Description = expense.Description,
                ExpenseId = expense.ExpenseId,
                Value = expense.Value,
            };

            var res = await _mediator.Send(updateExpenseCommand);
            if (res != null)
                return Ok(res);
            return BadRequest();
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteExpense (Guid id)
        {
            await _mediator.Send(new DeleteExpenseCommand(id));
            return Ok();
        }
    }
}
