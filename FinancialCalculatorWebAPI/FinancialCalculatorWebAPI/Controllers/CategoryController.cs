using FinancialCalculatorWebAPI.Commands;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Model.DTO;
using FinancialCalculatorWebAPI.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinancialCalculatorWebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetAll()
        {
            return Ok(await _mediator.Send(new GetAllCategoriesQuery()));
        }

        [HttpGet("undeleted")]
        public async Task<ActionResult<List<Category>>> GetAllUndeleted()
        {
            return Ok(await _mediator.Send(new GetAllUndeletedCategoriesQuery()));
        }

        [Authorize(Roles = "Moderator")]
        [HttpPost]
        public async Task<ActionResult<Category>> AddCategory(AddCategoryDTO categoryDTO)
        {
            var addCategoryCommand = new AddCategoryCommand
            {
                Name = categoryDTO.Name,
            };
            var res = await _mediator.Send(addCategoryCommand);
            if (res != null)
                return CreatedAtAction(nameof(AddCategory), res);
            return BadRequest();
        }

        [Authorize(Roles = "Moderator")]
        [HttpPut]
        public async Task<ActionResult<Category>> UpdateCategory(Category category)
        {
            var updateCategoryCommand = new UpdateCategoryCommand
            {
                CategoryId = category.CategoryId,
                Name = category.Name,
            };
            var res = await _mediator.Send(updateCategoryCommand);
            if(res != null)
                return Ok(res);
            return BadRequest();
        }

        [Authorize(Roles = "Moderator")]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteCategory(Guid id)
        {
            await _mediator.Send(new DeleteCategoryCommand(id));
            return Ok();
        }
    }
}
