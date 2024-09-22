using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

public class TaskService : ITaskService
{
    private readonly IGenericRepository<Tarea> _taskRepository;
    private readonly IGenericRepository<UsuarioTarea> _userTaskRepository;

    public TaskService(IGenericRepository<UsuarioTarea> userTaskRepository,
                       IGenericRepository<Tarea> taskRepository)
    {
        _taskRepository = taskRepository;
        _userTaskRepository = userTaskRepository;
    }

    public async Task<IEnumerable<Tarea>> GetAllTasksAsync()
    {
        return await _taskRepository.GetAllAsync();
    }

    public async Task<Tarea> GetTaskByIdAsync(int id)
    {
        return await _taskRepository.GetByIdAsync(id);
    }

    public async Task AddTaskAsync(TaskDto taskDto)
    {
        var task = new Tarea
        {
            Title = taskDto.Title,
            Description = taskDto.Description
        };

        await _taskRepository.AddAsync(task);
    }

    public async Task UpdateTaskAsync(TaskDto taskDto)
    {
        var existingTask = await _taskRepository.GetByIdAsync(taskDto.IdTask.Value);

        if (existingTask == null)
        {
            throw new Exception("Error: registro no encontrado");
        }

        existingTask.Title = taskDto.Title;
        existingTask.Description = taskDto.Description;
    
        await _taskRepository.UpdateAsync(existingTask);
    }

    public async Task DeleteTaskAsync(int id)
    {
        var existTask = await _taskRepository.GetByIdAsync(id);

        if (existTask == null)
        {
            throw new Exception("Error: Tarea no encontrada");
        }

        var userTasks = await _userTaskRepository.GetAllAsync();
        var lIdUserTask = userTasks.Where(x => x.IdTask == id).Select(x => x.IdUserTask).Distinct().ToList();

        if (lIdUserTask.Count > 0) 
        {
            foreach (var idUserTask in lIdUserTask)
            {
                await _userTaskRepository.DeleteAsync(idUserTask);
            }
        }

        await _taskRepository.DeleteAsync(id);
    }
}
