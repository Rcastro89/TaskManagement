using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    /// <summary>
    /// Interfaz para el servicio de gestión de usuarios.
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Obtiene todos los usuarios del sistema de manera asíncrona.
        /// </summary>
        /// <returns>Una lista de usuarios.</returns>
        Task<IEnumerable<VUsuario>> GetAllUsersAsync();

        /// <summary>
        /// Obtiene un usuario específico por su ID de manera asíncrona.
        /// </summary>
        /// <param name="id">ID del usuario a buscar.</param>
        /// <returns>El usuario encontrado o null si no existe.</returns>
        Task<VUsuario> GetUserByIdAsync(int id);

        /// <summary>
        /// Agrega un nuevo usuario en el sistema de manera asíncrona.
        /// </summary>
        /// <param name="userDto">Datos del nuevo usuario a agregar.</param>
        Task AddUserAsync(UserDto userDto);

        /// <summary>
        /// Actualiza los datos de un usuario existente en el sistema de manera asíncrona.
        /// </summary>
        /// <param name="userDto">Datos actualizados del usuario.</param>
        Task UpdateUserAsync(UserDto userDto);

        /// <summary>
        /// Elimina un usuario del sistema por su ID de manera asíncrona.
        /// </summary>
        /// <param name="id">ID del usuario a eliminar.</param>
        Task DeleteUserAsync(int id);

        /// <summary>
        /// Actualiza la contraseña de un usuario de manera asíncrona.
        /// </summary>
        /// <param name="id">ID del usuario cuya contraseña se actualizará.</param>
        /// <param name="newPassword">La nueva contraseña del usuario.</param>
        Task UpdateUserPasswordAsync(int id, string newPassword);

        /// <summary>
        /// Autentica a un usuario y devuelve un token de acceso de manera asíncrona.
        /// </summary>
        /// <param name="login">Credenciales de inicio de sesión del usuario.</param>
        /// <returns>Respuesta de autenticación que incluye el token y el rol.</returns>
        Task<AuthResponseDto> Authenticate(LoginDto login);
    }
}
