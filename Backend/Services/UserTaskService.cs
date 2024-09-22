using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    public class UserTaskService : IUserTaskService
    {
        private readonly IGenericRepository<VUsuarioTarea> _userTaskRepository;
        private readonly IGenericRepository<UsuarioTarea> _userTaskCrudRepository;
        private readonly IGenericRepository<Tarea> _taskRepository;
        private readonly IGenericRepository<Usuario> _userRepository;
        public const int EmpleadoRoleId = 3;

        public UserTaskService(IGenericRepository<VUsuarioTarea> userTaskRepository,
                               IGenericRepository<UsuarioTarea> userTaskCrudRepository,
                               IGenericRepository<Tarea> taskRepository, 
                               IGenericRepository<Usuario> userRepository)
        {
            _userTaskRepository = userTaskRepository;
            _userTaskCrudRepository = userTaskCrudRepository;
            _taskRepository = taskRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<VUsuarioTarea>> GetAllUserTasksAsync(int idUser)
        {
            var lUserTasks = await _userTaskRepository.GetAllAsync();
            var userRole = await _userRepository.GetByIdAsync(idUser);

            if (userRole.IdRole == EmpleadoRoleId)
            {
                lUserTasks = lUserTasks.Where(x => x.IdUser == idUser).ToList();
            }

            return lUserTasks;
        }

        public async Task<VUsuarioTarea> GetUserTaskByIdAsync(int id)
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

            await _userTaskCrudRepository.AddAsync(userTask);
        }

        public async Task UpdateUserTaskStatusAsync(UpdateUserTaskStatusDto updateUserTaskStatus, int idUser)
        {
            var userRole = await _userRepository.GetByIdAsync(idUser);
            var userTask = await _userTaskCrudRepository.GetByIdAsync(updateUserTaskStatus.IdUserTask);

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

            await _userTaskCrudRepository.UpdateAsync(userTask);
        }
    }
}
