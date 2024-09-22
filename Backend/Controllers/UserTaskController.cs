using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserTaskController : ControllerBase
    {
        private readonly IUserTaskService _userTaskService;

        public UserTaskController(IUserTaskService userTaskService)
        {
            _userTaskService = userTaskService;
        }

        // GET: api/UserTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetAllUserTasks(int? idUser)
        {
            try
            {
                var userTasks = await _userTaskService.GetAllUserTasksAsync();
                
                if (idUser.HasValue)
                {
                    userTasks = userTasks.Where(x => x.IdUser == idUser.Value);
                }
                
                return Ok(userTasks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        [Authorize(Roles = "Administrador, Supervisor")]
        public async Task<ActionResult> CreateUserTask([FromBody] UserTaskAssignmentDto assignment)
        {
            try
            {
                await _userTaskService.CreateUserTaskAsync(assignment);
                return Ok("Tarea asignada correctamente.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("updateStatus")]
        [Authorize(Roles = "Administrador, Supervisor, Empleado")]
        public async Task<ActionResult> UpdateUserTaskStatus([FromBody] UpdateUserTaskStatusDto updateUserTaskStatus)
        {
            try
            {
                await _userTaskService.UpdateUserTaskStatusAsync(updateUserTaskStatus, int.Parse(User.FindFirst("id")?.Value));
                return Ok("Estatus de tarea actualizada correctamente.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
