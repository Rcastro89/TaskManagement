using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

public interface IUserTaskService
{
    Task<IEnumerable<UsuarioTarea>> GetAllUserTasksAsync();
    Task<UsuarioTarea> GetUserTaskByIdAsync(int id);
    Task CreateUserTaskAsync(UserTaskAssignmentDto assignment);
    Task UpdateUserTaskStatusAsync(UpdateUserTaskStatusDto updateTaskStatus, int idUser);
}

