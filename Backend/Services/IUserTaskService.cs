using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

public interface IUserTaskService
{
    Task<IEnumerable<VUsuarioTarea>> GetAllUserTasksAsync(int idUser);
    Task<VUsuarioTarea> GetUserTaskByIdAsync(int id);
    Task<IEnumerable<UsuarioTarea>> GetUserTaskByIdUserAsync(int idUser);
    Task CreateUserTaskAsync(UserTaskAssignmentDto assignment);
    Task UpdateUserTaskStatusAsync(UpdateUserTaskStatusDto updateTaskStatus, int idUser);
    Task DeleteUserTaskAsync(int id);
}

