using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    public interface IRolesService
    {
        Task<IEnumerable<Role>> GetAllRolesAsync();
    }
}
