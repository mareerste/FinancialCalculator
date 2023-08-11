using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Commands
{
    public record DeleteUserCommand(Guid Id) : IRequest<Unit>;
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Unit>
    {
        private readonly IUserRepository _userRepository;
        public DeleteUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetById(request.Id);
            if(user != null)
            {
                user.IsDeleted = !user.IsDeleted;
                await _userRepository.Update(user);
                return Unit.Value;
            }
            throw new UserNotFoundException("User not found.");
        }
    }
}
