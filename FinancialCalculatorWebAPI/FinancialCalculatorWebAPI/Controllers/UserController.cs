﻿using FinancialCalculatorWebAPI.Commands;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Model.DTO;
using FinancialCalculatorWebAPI.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace FinancialCalculatorWebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(Roles = "Moderator")]
        [HttpGet]
        public async Task<ActionResult<List<UserDTO>>> GetAllUsers()
        {
            return Ok(await _mediator.Send(new GetAllUsersQuery()));
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<User>> GetUserById(Guid id)
        {
            var user = await _mediator.Send(new GetUserByIdQuery(id));
            if(user != null)
                return Ok(user);
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> AddUser(AddUserDTO userDTO)
        {
            var addUserCommand = new AddUserCommand
            {
                Username = userDTO.Username,
                Password = userDTO.Password,
                Mail = userDTO.Mail,
                BirthDate = userDTO.BirthDate,
                CurrentBalance = userDTO.CurrentBalance,
            };
            var user = await _mediator.Send(addUserCommand);
            if (user != null)
                return CreatedAtAction(nameof(AddUser), user);
            return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(UpdateUserDTO user)
        {
            var updateUserCommand = new UpdateUserCommand
            {
                UserId = user.UserId,
                BirthDate = user.BirthDate,
                Mail = user.Mail,
                CurrentBalance = user.CurrentBalance,
            };
            var retVal = await _mediator.Send(updateUserCommand);
            if (retVal != null)
                return Ok(retVal);
            return BadRequest();
        }
        [HttpPut("password")]
        public async Task<ActionResult<User>> UpdatePassword(ChangeUsersPasswordDTO passwordDTO)
        {

            string jwtToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var username = _mediator.Send(new GetMyUsernameQuery(jwtToken)).Result;

            if (username == null)
                return BadRequest();
                
            var updateUserPasswordCommand = new UpdateUserPasswordCommand
            {
                OldPassword = passwordDTO.OldPassword,
                NewPassword = passwordDTO.NewPassword,
                Username = username,
            };
            var user = await _mediator.Send(updateUserPasswordCommand);
            if(user != null)
                return Ok(user);
            return BadRequest();
        }

        [Authorize(Roles = "Moderator")]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteUser(Guid id)
        {
            await _mediator.Send(new DeleteUserCommand(id));
            return Ok();
        }

    }
}
