using AutoMapper;
using FinancialCalculatorWebAPI.Exceptions;
using FinancialCalculatorWebAPI.Model.DTO;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetLoggedUserQuery(string Username) : IRequest<UserDTO>;
    public class GetLoggedUserQueryHandler : IRequestHandler<GetLoggedUserQuery, UserDTO>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public GetLoggedUserQueryHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserDTO> Handle(GetLoggedUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUsername(request.Username);
            if (user is not null)
                return _mapper.Map<UserDTO>(user);
            throw new UserNotFoundException("User not found.");

        }
    }
}
