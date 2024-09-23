using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;
using TaskManagementAPI.Services;

public class TaskService : ITaskService
{
    private readonly IGenericRepository<Tarea> _taskRepository; // Repositorio para acceder a las tareas
    private readonly IGenericRepository<UsuarioTarea> _userTaskRepository; // Repositorio para acceder a las tareas de usuario

    /// <summary>
    /// Constructor del servicio de tareas que inyecta los repositorios necesarios.
    /// </summary>
    /// <param name="userTaskRepository">Repositorio de tareas de usuario.</param>
    /// <param name="taskRepository">Repositorio de tareas.</param>
    public TaskService(IGenericRepository<UsuarioTarea> userTaskRepository,
                       IGenericRepository<Tarea> taskRepository)
    {
        _taskRepository = taskRepository;
        _userTaskRepository = userTaskRepository;
    }

    /// <summary>
    /// Obtiene todas las tareas de forma asíncrona.
    /// </summary>
    /// <returns>Una lista de tareas.</returns>
    public async Task<IEnumerable<Tarea>> GetAllTasksAsync()
    {
        try
        {
            return await _taskRepository.GetAllAsync(); // Obtiene todas las tareas
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Error al obtener las tareas.", ex);
        }
    }

    /// <summary>
    /// Obtiene una tarea por su ID de forma asíncrona.
    /// </summary>
    /// <param name="id">ID de la tarea.</param>
    /// <returns>La tarea correspondiente.</returns>
    public async Task<Tarea> GetTaskByIdAsync(int id)
    {
        try
        {
            return await _taskRepository.GetByIdAsync(id); // Obtiene la tarea por ID
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Error al obtener la tarea con ID {id}.", ex);
        }
    }

    /// <summary>
    /// Agrega una nueva tarea de forma asíncrona.
    /// </summary>
    /// <param name="taskDto">DTO que contiene la información de la tarea.</param>
    public async Task AddTaskAsync(TaskDto taskDto)
    {
        try
        {
            var task = new Tarea
            {
                Title = taskDto.Title,
                Description = taskDto.Description
            };

            await _taskRepository.AddAsync(task); // Agrega la tarea
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Error al agregar la tarea.", ex);
        }
    }

    /// <summary>
    /// Actualiza una tarea existente de forma asíncrona.
    /// </summary>
    /// <param name="taskDto">DTO que contiene la información de la tarea actualizada.</param>
    public async Task UpdateTaskAsync(TaskDto taskDto)
    {
        try
        {
            var existingTask = await _taskRepository.GetByIdAsync(taskDto.IdTask.Value);

            if (existingTask == null)
            {
                throw new Exception("Error: registro no encontrado");
            }

            existingTask.Title = taskDto.Title;
            existingTask.Description = taskDto.Description;

            await _taskRepository.UpdateAsync(existingTask); // Actualiza la tarea
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Error al actualizar la tarea.", ex);
        }
    }

    /// <summary>
    /// Elimina una tarea por su ID de forma asíncrona.
    /// </summary>
    /// <param name="id">ID de la tarea a eliminar.</param>
    public async Task DeleteTaskAsync(int id)
    {
        try
        {
            var existingTask = await _taskRepository.GetByIdAsync(id);

            if (existingTask == null)
            {
                throw new Exception("Error: Tarea no encontrada");
            }

            // Obtiene las tareas de usuario asociadas a esta tarea
            var userTasks = await _userTaskRepository.GetAllAsync();
            var userTaskIds = userTasks
                .Where(x => x.IdTask == id)
                .Select(x => x.IdUserTask)
                .Distinct()
                .ToList();

            // Elimina las tareas de usuario asociadas
            if (userTaskIds.Count > 0)
            {
                foreach (var userTaskId in userTaskIds)
                {
                    await _userTaskRepository.DeleteAsync(userTaskId);
                }
            }

            await _taskRepository.DeleteAsync(id); // Elimina la tarea
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Error al eliminar la tarea.", ex);
        }
    }
}
