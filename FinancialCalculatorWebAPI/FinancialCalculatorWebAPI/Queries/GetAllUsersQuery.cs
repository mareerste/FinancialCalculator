using AutoMapper;
using FinancialCalculatorWebAPI.Model;
using FinancialCalculatorWebAPI.Model.DTO;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using MediatR;

namespace FinancialCalculatorWebAPI.Queries
{
    public record GetAllUsersQuery: IRequest<List<UserDTO>>;

    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, List<UserDTO>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public GetAllUsersQueryHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<List<UserDTO>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = _userRepository.GetAll().Result.ToList();
            return _mapper.Map<List<UserDTO>>(users);
        }
    }
}
