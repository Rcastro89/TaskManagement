using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    public class UserTaskService : IUserTaskService
    {
        private readonly IGenericRepository<UsuarioTarea> _userTaskRepository;
        private readonly IGenericRepository<Tarea> _taskRepository;
        private readonly IGenericRepository<Usuario> _userRepository;
        public const int EmpleadoRoleId = 3;
        public UserTaskService(IGenericRepository<UsuarioTarea> userTaskRepository, 
                               IGenericRepository<Tarea> taskRepository, 
                               IGenericRepository<Usuario> userRepository)
        {
            _userTaskRepository = userTaskRepository;
            _taskRepository = taskRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<UsuarioTarea>> GetAllUserTasksAsync()
        {
            return await _userTaskRepository.GetAllAsync();
        }

        public async Task<UsuarioTarea> GetUserTaskByIdAsync(int id)
        {
            return await _userTaskRepository.GetByIdAsync(id);
        }

        public async Task CreateUserTaskAsync(UserTaskAssignmentDto assignment)
        {
            var user = await _userRepository.GetByIdAsync(assignment.IdUser);
            var task = await _taskRepository.GetByIdAsync(assignment.IdTask);

            if (user == null || task == null)
            {
                throw new Exception("Usuario o Tarea no encontrados.");
            }

            var userTask = new UsuarioTarea
            {
                IdUser = assignment.IdUser,
                IdTask = assignment.IdTask,
                Status = assignment.Status
            };

            await _userTaskRepository.AddAsync(userTask);
        }

        public async Task UpdateUserTaskStatusAsync(UpdateUserTaskStatusDto updateUserTaskStatus, int idUser)
        {
            var userRole = await _userRepository.GetByIdAsync(idUser);
            var userTask = await _userTaskRepository.GetByIdAsync(updateUserTaskStatus.IdUserTask);

            if (userTask == null)
            {
                throw new Exception("Tarea no encontrada.");
            }

            if (userRole.IdRole == EmpleadoRoleId)
            {
                if (userTask.IdUser != idUser)
                {
                    throw new Exception("No tienes permiso para actualizar el estatus de esta tarea.");
                }
            }

            userTask.Status = updateUserTaskStatus.Status;

            await _userTaskRepository.UpdateAsync(userTask);
        }
    }
}
