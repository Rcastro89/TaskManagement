using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    /// <summary>
    /// Interfaz para el servicio de gestión de tareas.
    /// </summary>
    public interface ITaskService
    {
        /// <summary>
        /// Obtiene todas las tareas disponibles en el sistema de manera asíncrona.
        /// </summary>
        /// <returns>Una lista de tareas.</returns>
        Task<IEnumerable<Tarea>> GetAllTasksAsync();

        /// <summary>
        /// Obtiene una tarea específica por su ID de manera asíncrona.
        /// </summary>
        /// <param name="id">ID de la tarea a buscar.</param>
        /// <returns>La tarea encontrada o null si no existe.</returns>
        Task<Tarea> GetTaskByIdAsync(int id);

        /// <summary>
        /// Agrega una nueva tarea en el sistema de manera asíncrona.
        /// </summary>
        /// <param name="taskDto">Datos de la tarea a agregar.</param>
        Task AddTaskAsync(TaskDto taskDto);

        /// <summary>
        /// Actualiza una tarea existente en el sistema de manera asíncrona.
        /// </summary>
        /// <param name="taskDto">Datos actualizados de la tarea.</param>
        Task UpdateTaskAsync(TaskDto taskDto);

        /// <summary>
        /// Elimina una tarea del sistema por su ID de manera asíncrona.
        /// </summary>
        /// <param name="id">ID de la tarea a eliminar.</param>
        Task DeleteTaskAsync(int id);
    }
}
