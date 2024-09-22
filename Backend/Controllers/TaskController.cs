using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using TaskManagementAPI.Services;
using TaskManagementAPI.DTOs;

namespace TaskManagementAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: api/Task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetAllTasks()
        {
            try
            {
                var tasks = await _taskService.GetAllTasksAsync();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTaskById(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        // POST: api/Task
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<Tarea>> CreateTask([FromBody] TaskDto newTask)
        {
            try
            {
                await _taskService.AddTaskAsync(newTask);
                return Ok("Tarea creada con éxito");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskDto updatedTask)
        {
            if (id != updatedTask.IdTask)
            {
                return BadRequest();
            }

            try
            {
                await _taskService.UpdateTaskAsync(updatedTask);
                return Ok("Tarea actualizada con éxito");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                await _taskService.DeleteTaskAsync(id);
            return Ok("Tarea eliminada con éxito");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
