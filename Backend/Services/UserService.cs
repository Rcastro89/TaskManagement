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
    private readonly IGenericRepository<VUsuario> _userRepository; // Repositorio para vistas de usuario
    private readonly IGenericRepository<Usuario> _userCrudRepository; // Repositorio para operaciones CRUD de usuario
    private readonly IUserTaskService _userTaskRepository; // Servicio para manejar tareas de usuario
    private readonly IGenericRepository<Role> _roleRepository; // Repositorio para roles
    private readonly IConfiguration _configuration; // Configuración de la aplicación
    private readonly PasswordService _passwordServices; // Servicio para manejar contraseñas

    /// <summary>
    /// Constructor del servicio de usuario que inyecta las dependencias necesarias.
    /// </summary>
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

    /// <summary>
    /// Obtiene todos los usuarios de forma asíncrona.
    /// </summary>
    /// <returns>Lista de usuarios.</returns>
    public async Task<IEnumerable<VUsuario>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllAsync();
    }

    /// <summary>
    /// Obtiene un usuario por su ID de forma asíncrona.
    /// </summary>
    /// <param name="id">ID del usuario.</param>
    /// <returns>Usuario correspondiente al ID.</returns>
    public async Task<VUsuario> GetUserByIdAsync(int id)
    {
        return await _userRepository.GetByIdAsync(id);
    }

    /// <summary>
    /// Agrega un nuevo usuario de forma asíncrona.
    /// </summary>
    /// <param name="userDto">DTO que contiene la información del usuario.</param>
    public async Task AddUserAsync(UserDto userDto)
    {
        await ValidateNameAndRoleAsync(userDto); // Validar nombre de usuario y rol

        var user = new Usuario
        {
            UserName = userDto.UserName,
            PasswordHash = _passwordServices.HashPassword(userDto.PasswordHash),
            IdRole = userDto.RoleId
        };

        await _userCrudRepository.AddAsync(user); // Agregar el usuario
    }

    /// <summary>
    /// Actualiza un usuario existente de forma asíncrona.
    /// </summary>
    /// <param name="userDto">DTO que contiene la información del usuario actualizada.</param>
    public async Task UpdateUserAsync(UserDto userDto)
    {
        await ValidateNameAndRoleAsync(userDto); // Validar nombre de usuario y rol

        var existingUser = await _userCrudRepository.GetByIdAsync(userDto.UserId.Value);

        if (existingUser == null)
        {
            throw new Exception("Usuario no encontrado");
        }

        existingUser.UserName = userDto.UserName;
        existingUser.IdRole = userDto.RoleId;

        await _userCrudRepository.UpdateAsync(existingUser); // Actualizar el usuario
    }

    /// <summary>
    /// Elimina un usuario por su ID de forma asíncrona.
    /// </summary>
    /// <param name="id">ID del usuario a eliminar.</param>
    public async Task DeleteUserAsync(int id)
    {
        var userTasks = await _userTaskRepository.GetUserTaskByIdUserAsync(id); // Obtener tareas del usuario

        // Eliminar las tareas del usuario
        foreach (var userTask in userTasks)
        {
            await _userTaskRepository.DeleteUserTaskAsync(userTask.IdUserTask);
        }

        await _userCrudRepository.DeleteAsync(id); // Eliminar el usuario
    }

    /// <summary>
    /// Actualiza la contraseña de un usuario de forma asíncrona.
    /// </summary>
    /// <param name="id">ID del usuario.</param>
    /// <param name="newPassword">Nueva contraseña.</param>
    public async Task UpdateUserPasswordAsync(int id, string newPassword)
    {
        var user = await _userCrudRepository.GetByIdAsync(id);

        if (user == null)
        {
            throw new Exception("Usuario no encontrado");
        }

        user.PasswordHash = _passwordServices.HashPassword(newPassword);

        await _userCrudRepository.UpdateAsync(user); // Actualizar la contraseña del usuario
    }

    /// <summary>
    /// Autentica a un usuario y genera un token JWT de forma asíncrona.
    /// </summary>
    /// <param name="login">DTO con las credenciales de inicio de sesión.</param>
    /// <returns>DTO con el token de autenticación.</returns>
    public async Task<AuthResponseDto> Authenticate(LoginDto login)
    {
        AuthResponseDto result = new AuthResponseDto();
        SecurityToken? token = null;

        try
        {
            var users = await _userCrudRepository.GetAllAsync();
            var user = users.FirstOrDefault(u => u.UserName == login.Username);

            // Verificar que el usuario exista y que la contraseña sea correcta
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

            token = tokenHandler.CreateToken(tokenDescriptor); // Crear el token JWT
            result.Token = tokenHandler.WriteToken(token);
            result.Role = user.IdRoleNavigation.RoleName; // Asignar el rol al resultado
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Error al autenticar el usuario: {ex.Message}", ex);
        }

        return result;
    }

    /// <summary>
    /// Valida el nombre de usuario y el rol de forma asíncrona.
    /// </summary>
    /// <param name="userDto">DTO que contiene la información del usuario.</param>
    private async Task ValidateNameAndRoleAsync(UserDto userDto)
    {
        var role = await _roleRepository.GetByIdAsync(userDto.RoleId);
        if (role == null)
        {
            throw new Exception("Rol inválido");
        }

        var existingUsers = await _userCrudRepository.GetAllAsync();

        if (!userDto.UserId.HasValue)
        {
            if (existingUsers.Any(u => u.UserName == userDto.UserName))
            {
                throw new Exception("Error: No es posible crear el usuario (El nombre de usuario ya está en uso. Por favor, elige otro.)");
            }
        }
        else
        {
            if (existingUsers.Any(u => u.UserName == userDto.UserName && u.IdUser != userDto.UserId))
            {
                throw new Exception("Error: No es posible actualizar el nombre del usuario (El nombre de usuario ya está en uso. Por favor, elige otro.)");
            }
        }
    }
}
