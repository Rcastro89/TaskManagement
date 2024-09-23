using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TaskManagementAPI.Controllers
{
    // Asegura que solo los usuarios autorizados puedan acceder a este controlador
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserTaskController : ControllerBase
    {
        private readonly IUserTaskService _userTaskService; // Servicio para gestionar tareas de usuario

        // Constructor que inyecta el servicio de tareas de usuario
        public UserTaskController(IUserTaskService userTaskService)
        {
            _userTaskService = userTaskService; // Inicializa el servicio
        }

        // GET: api/UserTask
        /// <summary>
        /// Obtiene todas las tareas asignadas al usuario actual.
        /// </summary>
        /// <returns>Lista de tareas en caso de éxito.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetAllUserTasks()
        {
            try
            {
                // Obtiene el ID del usuario desde el contexto de autenticación
                int userId = int.Parse(User.FindFirst("id")?.Value);
                var userTasks = await _userTaskService.GetAllUserTasksAsync(userId);

                return Ok(userTasks); // Devuelve la lista de tareas
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener las tareas: " + ex.Message); // Mensaje de error genérico
            }
        }

        // POST: api/UserTask/create
        /// <summary>
        /// Crea una nueva tarea asignada a un usuario.
        /// </summary>
        /// <param name="assignment">Datos de la tarea a asignar.</param>
        /// <returns>Mensaje de éxito o error en caso de fallo.</returns>
        [HttpPost("create")]
        [Authorize(Roles = "Administrador, Supervisor")]
        public async Task<ActionResult> CreateUserTask([FromBody] UserTaskAssignmentDto assignment)
        {
            try
            {
                await _userTaskService.CreateUserTaskAsync(assignment);
                return Ok("Tarea asignada correctamente."); // Mensaje de éxito
            }
            catch (Exception ex)
            {
                return BadRequest("Error al asignar la tarea: " + ex.Message); // Mensaje de error genérico
            }
        }

        // POST: api/UserTask/updateStatus
        /// <summary>
        /// Actualiza el estado de una tarea asignada a un usuario.
        /// </summary>
        /// <param name="updateUserTaskStatus">Modelo que contiene el nuevo estado de la tarea.</param>
        /// <returns>Mensaje de éxito o error en caso de fallo.</returns>
        [HttpPost("updateStatus")]
        public async Task<ActionResult> UpdateUserTaskStatus([FromBody] UpdateUserTaskStatusDto updateUserTaskStatus)
        {
            try
            {
                // Obtiene el ID del usuario desde el contexto de autenticación
                int userId = int.Parse(User.FindFirst("id")?.Value);
                await _userTaskService.UpdateUserTaskStatusAsync(updateUserTaskStatus, userId);
                return Ok("Estatus de tarea actualizada correctamente."); // Mensaje de éxito
            }
            catch (Exception ex)
            {
                return BadRequest("Error al actualizar el estatus de la tarea: " + ex.Message); // Mensaje de error genérico
            }
        }

        // DELETE: api/UserTask/5
        /// <summary>
        /// Elimina una tarea asignada a un usuario.
        /// </summary>
        /// <param name="id">ID de la tarea a eliminar.</param>
        /// <returns>Mensaje de éxito o error en caso de fallo.</returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador, Supervisor")]
        public async Task<IActionResult> DeleteUserTask(int id)
        {
            try
            {
                await _userTaskService.DeleteUserTaskAsync(id);
                return Ok("Tarea del usuario eliminada con éxito"); // Mensaje de éxito
            }
            catch (Exception ex)
            {
                return BadRequest("Error al eliminar la tarea: " + ex.Message); // Mensaje de error genérico
            }
        }
    }
}
