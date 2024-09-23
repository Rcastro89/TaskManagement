using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    public class UserTaskService : IUserTaskService
    {
        private readonly IGenericRepository<VUsuarioTarea> _userTaskRepository; // Repositorio para vistas de tareas de usuario
        private readonly IGenericRepository<UsuarioTarea> _userTaskCrudRepository; // Repositorio para operaciones CRUD de tareas de usuario
        private readonly IGenericRepository<Tarea> _taskRepository; // Repositorio para tareas
        private readonly IGenericRepository<Usuario> _userRepository; // Repositorio para usuarios
        public const int EmpleadoRoleId = 3; // ID del rol de empleado

        /// <summary>
        /// Constructor del servicio de tareas de usuario que inyecta las dependencias necesarias.
        /// </summary>
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

        /// <summary>
        /// Obtiene todas las tareas de un usuario de forma asíncrona.
        /// </summary>
        /// <param name="idUser">ID del usuario.</param>
        /// <returns>Lista de tareas del usuario.</returns>
        public async Task<IEnumerable<VUsuarioTarea>> GetAllUserTasksAsync(int idUser)
        {
            var userTasks = await _userTaskRepository.GetAllAsync(); // Obtener todas las tareas
            var userRole = await _userRepository.GetByIdAsync(idUser); // Obtener el rol del usuario

            // Filtrar tareas si el usuario tiene el rol de empleado
            if (userRole.IdRole == EmpleadoRoleId)
            {
                userTasks = userTasks.Where(x => x.IdUser == idUser).ToList();
            }

            return userTasks;
        }

        /// <summary>
        /// Obtiene una tarea de usuario por su ID de forma asíncrona.
        /// </summary>
        /// <param name="id">ID de la tarea de usuario.</param>
        /// <returns>Tarea de usuario correspondiente al ID.</returns>
        public async Task<VUsuarioTarea> GetUserTaskByIdAsync(int id)
        {
            return await _userTaskRepository.GetByIdAsync(id);
        }

        /// <summary>
        /// Obtiene las tareas de un usuario por su ID de forma asíncrona.
        /// </summary>
        /// <param name="idUser">ID del usuario.</param>
        /// <returns>Lista de tareas del usuario.</returns>
        public async Task<IEnumerable<UsuarioTarea>> GetUserTaskByIdUserAsync(int idUser)
        {
            var userTasks = await _userTaskCrudRepository.GetAllAsync(); // Obtener todas las tareas
            return userTasks.Where(x => x.IdUser == idUser); // Filtrar por ID de usuario
        }

        /// <summary>
        /// Crea una nueva tarea de usuario de forma asíncrona.
        /// </summary>
        /// <param name="assignment">DTO que contiene la información de la tarea de usuario.</param>
        public async Task CreateUserTaskAsync(UserTaskAssignmentDto assignment)
        {
            try
            {
                var user = await _userRepository.GetByIdAsync(assignment.UserId);
                var task = await _taskRepository.GetByIdAsync(assignment.TaskId);

                // Verificar que el usuario y la tarea existan
                if (user == null || task == null)
                {
                    throw new Exception("Usuario o Tarea no encontrados.");
                }

                var userTask = new UsuarioTarea
                {
                    IdUser = assignment.UserId,
                    IdTask = assignment.TaskId,
                    Status = assignment.Status
                };

                await _userTaskCrudRepository.AddAsync(userTask); // Agregar la tarea de usuario
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al crear la tarea de usuario: {ex.Message}", ex);
            }
        }

        /// <summary>
        /// Actualiza el estado de una tarea de usuario de forma asíncrona.
        /// </summary>
        /// <param name="updateUserTaskStatus">DTO que contiene la información para actualizar el estado de la tarea.</param>
        /// <param name="idUser">ID del usuario que realiza la actualización.</param>
        public async Task UpdateUserTaskStatusAsync(UpdateUserTaskStatusDto updateUserTaskStatus, int idUser)
        {
            try
            {
                var userRole = await _userRepository.GetByIdAsync(idUser);
                var userTask = await _userTaskCrudRepository.GetByIdAsync(updateUserTaskStatus.UserTaskId);

                if (userTask == null)
                {
                    throw new Exception("Tarea no encontrada.");
                }

                // Verificar permisos para actualizar la tarea
                if (userRole.IdRole == EmpleadoRoleId && userTask.IdUser != idUser)
                {
                    throw new Exception("No tienes permiso para actualizar el estatus de esta tarea.");
                }

                userTask.Status = updateUserTaskStatus.Status;

                await _userTaskCrudRepository.UpdateAsync(userTask); // Actualizar la tarea de usuario
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al actualizar el estado de la tarea de usuario: {ex.Message}", ex);
            }
        }

        /// <summary>
        /// Elimina una tarea de usuario por su ID de forma asíncrona.
        /// </summary>
        /// <param name="id">ID de la tarea de usuario a eliminar.</param>
        public async Task DeleteUserTaskAsync(int id)
        {
            try
            {
                await _userTaskCrudRepository.DeleteAsync(id); // Eliminar la tarea de usuario
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al eliminar la tarea de usuario: {ex.Message}", ex);
            }
        }
    }
}
