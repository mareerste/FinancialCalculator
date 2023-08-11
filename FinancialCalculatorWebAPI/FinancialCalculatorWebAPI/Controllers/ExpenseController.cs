using FinancialCalculatorWebAPI.Commands;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Model.DTO;
using FinancialCalculatorWebAPI.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinancialCalculatorWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ExpenseController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //TODO: Extract username from JWT, it should not be sent throught URL (or add constraint)
        [HttpGet("{username}")]
        public async Task<ActionResult<List<Expense>>> GetAllByUser(string username)
        {
            return Ok(await _mediator.Send(new GetAllExpensesByUserQuery(username)));
        }
        //TODO: Extract username from JWT
        [HttpGet("{year:int}/{month:int}")]
        public async Task<ActionResult<List<Expense>>> GetExpensesInMonth(int year, int month)
        {
            var GetAllExpensesInMonthQuery = new GetAllExpensesInMonthQuery(year, month, "marko123");

            var res = await _mediator.Send(GetAllExpensesInMonthQuery);
            if(res != null)
                return Ok(res);
            return BadRequest();
        }

        //TODO: Extract username from JWT
        [HttpPost]
        public async Task<ActionResult<Expense>> AddExpense (AddExpenseDTO expenseDTO)
        {
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
