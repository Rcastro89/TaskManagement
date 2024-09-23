using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;
using TaskManagementAPI.Services;

public class UserService : IUserService
{
    private readonly IGenericRepository<VUsuario> _userRepository;
    private readonly IGenericRepository<Usuario> _userCrudRepository;
    private readonly IUserTaskService _userTaskRepository;
    private readonly IGenericRepository<Role> _roleRepository;
    private readonly IConfiguration _configuration;
    private readonly PasswordService _passwordServices;

    public UserService(IGenericRepository<VUsuario> userRepository,
                       IGenericRepository<Usuario> userCrudRepository,
                       IUserTaskService userTaskRepository,
                       IConfiguration configuration, 
                       PasswordService passwordServices, 
                       IGenericRepository<Role> roleRepository)
    {
        _userRepository = userRepository;
        _userCrudRepository = userCrudRepository;
        _userTaskRepository = userTaskRepository;
        _configuration = configuration;
        _passwordServices = passwordServices;
        _roleRepository = roleRepository;
    }

    public async Task<IEnumerable<VUsuario>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllAsync();
    }

    public async Task<VUsuario> GetUserByIdAsync(int id)
    {
        return await _userRepository.GetByIdAsync(id);
    }

    public async Task AddUserAsync(UserDto userDto)
    {
        await ValidateNameAndRoleAsync(userDto);

        var user = new Usuario
        {
            UserName = userDto.UserName,
            PasswordHash = _passwordServices.HashPassword(userDto.PasswordHash),
            IdRole = userDto.IdRole
        };

        await _userCrudRepository.AddAsync(user);
    }

    public async Task UpdateUserAsync(UserDto userDto)
    {
        await ValidateNameAndRoleAsync(userDto);

        var existingUser = await _userCrudRepository.GetByIdAsync(userDto.IdUser.Value);

        if (existingUser == null)
        {
            throw new Exception("Usuario no encontrado");
        }

        existingUser.UserName = userDto.UserName;
        existingUser.IdRole = userDto.IdRole;

        await _userCrudRepository.UpdateAsync(existingUser);
    }

    public async Task DeleteUserAsync(int id)
    {
        var lUserTask = await _userTaskRepository.GetUserTaskByIdUserAsync(id);
        
        foreach (var userTask in lUserTask) 
        {
            await _userTaskRepository.DeleteUserTaskAsync(userTask.IdUserTask);
        }

        await _userCrudRepository.DeleteAsync(id);
    }

    public async Task UpdateUserPasswordAsync(int id, string newPassword)
    {
        var user = await _userCrudRepository.GetByIdAsync(id);

        if (user == null)
        {
            throw new Exception("Usuario no encontrado");
        }

        user.PasswordHash = _passwordServices.HashPassword(newPassword);

        await _userCrudRepository.UpdateAsync(user);
    }

    public async Task<AuthResponseDto> Authenticate(LoginDto login)
    {
        AuthResponseDto result = new AuthResponseDto();
        SecurityToken? token = null;
        var users = await _userCrudRepository.GetAllAsync();

        var user = users.FirstOrDefault(u => u.UserName == login.Username);

        if (user == null || !_passwordServices.VerifyPassword(user.PasswordHash, login.Password))
        {
            throw new Exception("Error: Usuario o contraseña incorrecta");
        }

        var role = user.IdRole.HasValue ? (await _roleRepository.GetByIdAsync(user.IdRole.Value))?.RoleName : null;

        if (role == null)
        {
            throw new Exception("Error: El usuario no tiene un rol válido.");
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

        var claims = new List<Claim>
        {
            new Claim("id", user.IdUser.ToString()),
            new Claim(ClaimTypes.Role, role)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Audience = _configuration["Jwt:Audience"],
            Issuer = _configuration["Jwt:Issuer"]
        };
        try
        {
            token = tokenHandler.CreateToken(tokenDescriptor);
        }
        catch (Exception ex) 
        {
            throw new Exception($"Failure: {ex.Message}");
        }

        result.Token = tokenHandler.WriteToken(token);
        result.Role = user.IdRoleNavigation.RoleName;
        return result;
    }

    private async Task ValidateNameAndRoleAsync(UserDto userDto)
    {
        var role = await _roleRepository.GetByIdAsync(userDto.IdRole);
        if (role == null)
        {
            throw new Exception("Rol inválido");
        }

        var existingUsers = await _userCrudRepository.GetAllAsync();

        if (!userDto.IdUser.HasValue)
        {
            if (existingUsers.Any(u => u.UserName == userDto.UserName))
            {
                throw new Exception("Error: No es posible crear el usuario (El nombre de usuario ya está en uso. Por favor, elige otro.)");
            }
        }
        else
        {
            if (existingUsers.Any(u => u.UserName == userDto.UserName && u.IdUser != userDto.IdUser))
            {
                throw new Exception("Error: No es posible actualizar el nombre del usuario (El nombre de usuario ya está en uso. Por favor, elige otro.)");
            }
        }
    }
}
