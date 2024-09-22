using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

public interface IUserService
{
    Task<IEnumerable<Usuario>> GetAllUsersAsync();
    Task<Usuario> GetUserByIdAsync(int id);
    Task AddUserAsync(UserDto userDto);
    Task UpdateUserAsync(UserDto userDto);
    Task DeleteUserAsync(int id);
    Task UpdateUserPasswordAsync(int id, string newPassword);
    Task<string> Authenticate(LoginDto login);
}
