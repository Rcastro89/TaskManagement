using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    public class RolesService : IRolesService
    {
        private readonly IGenericRepository<Role> _roleRepository;

        public RolesService(IGenericRepository<Role> roleRepository) 
        {
            _roleRepository = roleRepository;
        }

        public async Task<IEnumerable<Role>> GetAllRolesAsync()
        {
            return await _roleRepository.GetAllAsync();
        }
    }
}
