using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

public interface IUserService
{
    Task<IEnumerable<VUsuario>> GetAllUsersAsync();
    Task<VUsuario> GetUserByIdAsync(int id);
    Task AddUserAsync(UserDto userDto);
    Task UpdateUserAsync(UserDto userDto);
    Task DeleteUserAsync(int id);
    Task UpdateUserPasswordAsync(int id, string newPassword);
    Task<AuthResponseDto> Authenticate(LoginDto login);
}
