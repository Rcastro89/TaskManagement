using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    /// <summary>
    /// Interfaz para el servicio de gestión de tareas de usuario.
    /// </summary>
    public interface IUserTaskService
    {
        /// <summary>
        /// Obtiene todas las tareas asignadas a un usuario específico de manera asíncrona.
        /// </summary>
        /// <param name="idUser">ID del usuario cuyas tareas se desean obtener.</param>
        /// <returns>Una lista de tareas asignadas al usuario.</returns>
        Task<IEnumerable<VUsuarioTarea>> GetAllUserTasksAsync(int idUser);

        /// <summary>
        /// Obtiene una tarea de usuario específica por su ID de manera asíncrona.
        /// </summary>
        /// <param name="id">ID de la tarea a buscar.</param>
        /// <returns>La tarea de usuario encontrada o null si no existe.</returns>
        Task<VUsuarioTarea> GetUserTaskByIdAsync(int id);

        /// <summary>
        /// Obtiene todas las tareas asignadas a un usuario específico por su ID de manera asíncrona.
        /// </summary>
        /// <param name="idUser">ID del usuario cuyas tareas se desean obtener.</param>
        /// <returns>Una lista de tareas asignadas al usuario.</returns>
        Task<IEnumerable<UsuarioTarea>> GetUserTaskByIdUserAsync(int idUser);

        /// <summary>
        /// Crea una nueva tarea asignada a un usuario de manera asíncrona.
        /// </summary>
        /// <param name="assignment">Datos de la tarea a asignar.</param>
        Task CreateUserTaskAsync(UserTaskAssignmentDto assignment);

        /// <summary>
        /// Actualiza el estado de una tarea de usuario de manera asíncrona.
        /// </summary>
        /// <param name="updateTaskStatus">Datos de actualización del estado de la tarea.</param>
        /// <param name="idUser">ID del usuario al que se le actualiza la tarea.</param>
        Task UpdateUserTaskStatusAsync(UpdateUserTaskStatusDto updateTaskStatus, int idUser);

        /// <summary>
        /// Elimina una tarea de usuario por su ID de manera asíncrona.
        /// </summary>
        /// <param name="id">ID de la tarea a eliminar.</param>
        Task DeleteUserTaskAsync(int id);
    }
}
