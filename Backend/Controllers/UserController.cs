using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Models;
using TaskManagementAPI.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;

namespace TaskManagementAPI.Controllers
{
    // Asegura que solo los usuarios autorizados puedan acceder a este controlador
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService; // Servicio para gestionar usuarios

        // Constructor que inyecta el servicio de usuarios
        public UserController(IUserService userService)
        {
            _userService = userService; // Inicializa el servicio de usuarios
        }

        // GET: api/User
        /// <summary>
        /// Obtiene todos los usuarios del sistema.
        /// </summary>
        /// <returns>Lista de usuarios en caso de éxito.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VUsuario>>> GetAllUsers()
        {
            try
            {
                // Obtiene todos los usuarios a través del servicio
                var users = await _userService.GetAllUsersAsync();
                return Ok(users); // Devuelve la lista de usuarios
            }
            catch (Exception)
            {
                return BadRequest("Error al obtener la lista de usuarios."); // Mensaje genérico en caso de error
            }
        }

        // GET: api/User/5
        /// <summary>
        /// Obtiene un usuario específico por su ID.
        /// </summary>
        /// <param name="id">ID del usuario a buscar.</param>
        /// <returns>Usuario encontrado o NotFound si no existe.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<VUsuario>> GetUserById(int id)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(id);
                if (user == null)
                {
                    return NotFound(); // Devuelve 404 si no se encuentra el usuario
                }
                return Ok(user); // Devuelve el usuario encontrado
            }
            catch (Exception)
            {
                return BadRequest("Error al obtener el usuario."); // Mensaje genérico en caso de error
            }
        }

        // POST: api/User
        /// <summary>
        /// Crea un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="newUser">Datos del nuevo usuario a crear.</param>
        /// <returns>Mensaje de éxito o error en caso de fallo.</returns>
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<Usuario>> CreateUser([FromBody] UserDto newUser)
        {
            try
            {
                await _userService.AddUserAsync(newUser);
                return Ok("Usuario creado con éxito"); // Devuelve mensaje de éxito
            }
            catch (Exception)
            {
                return BadRequest("Error al crear el usuario."); // Mensaje genérico en caso de error
            }
        }

        // PUT: api/User/5
        /// <summary>
        /// Actualiza los datos de un usuario existente.
        /// </summary>
        /// <param name="id">ID del usuario a actualizar.</param>
        /// <param name="updatedUser">Datos actualizados del usuario.</param>
        /// <returns>Mensaje de éxito o error en caso de fallo.</returns>
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto updatedUser)
        {
            if (id != updatedUser.UserId)
            {
                return BadRequest("El ID del usuario no coincide."); // Valida que el ID sea correcto
            }

            try
            {
                await _userService.UpdateUserAsync(updatedUser);
                return Ok("Usuario actualizado con éxito"); // Devuelve mensaje de éxito
            }
            catch (Exception)
            {
                return BadRequest("Error al actualizar el usuario."); // Mensaje genérico en caso de error
            }
        }

        // DELETE: api/User/5
        /// <summary>
        /// Elimina un usuario del sistema.
        /// </summary>
        /// <param name="id">ID del usuario a eliminar.</param>
        /// <returns>Mensaje de éxito o error en caso de fallo.</returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                await _userService.DeleteUserAsync(id);
                return Ok("Usuario eliminado con éxito"); // Devuelve mensaje de éxito
            }
            catch (Exception)
            {
                return BadRequest("Error al eliminar el usuario."); // Mensaje genérico en caso de error
            }
        }

        // PUT: api/User/UpdatePassword
        /// <summary>
        /// Actualiza la contraseña de un usuario.
        /// </summary>
        /// <param name="model">Modelo que contiene el ID del usuario y la nueva contraseña.</param>
        /// <returns>Mensaje de éxito o error en caso de fallo.</returns>
        [HttpPut("UpdatePassword")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordDto model)
        {
            try
            {
                await _userService.UpdateUserPasswordAsync(model.UserId, model.NewPassword);
                return Ok("Contraseña actualizada con éxito"); // Devuelve mensaje de éxito
            }
            catch (Exception)
            {
                return BadRequest("Error al actualizar la contraseña."); // Mensaje genérico en caso de error
            }
        }
    }
}
