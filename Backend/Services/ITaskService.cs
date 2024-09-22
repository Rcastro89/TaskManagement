using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

public interface ITaskService
{
    Task<IEnumerable<Tarea>> GetAllTasksAsync();
    Task<Tarea> GetTaskByIdAsync(int id);
    Task AddTaskAsync(TaskDto taskDto);
    Task UpdateTaskAsync(TaskDto taskDto);
    Task DeleteTaskAsync(int id);
}
