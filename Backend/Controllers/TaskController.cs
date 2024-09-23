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

        // Constructor que recibe el servicio de tareas
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: api/Task
        /// <summary>
        /// Obtiene todas las tareas.
        /// </summary>
        /// <returns>Lista de tareas.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetAllTasks()
        {
            try
            {
                var tasks = await _taskService.GetAllTasksAsync();
                return Ok(tasks);
            }
            catch (Exception)
            {
                return BadRequest("No se pudo obtener la lista de tareas.");
            }
        }

        // GET: api/Task/5
        /// <summary>
        /// Obtiene una tarea por su ID.
        /// </summary>
        /// <param name="id">ID de la tarea.</param>
        /// <returns>Tarea correspondiente al ID proporcionado.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTaskById(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound("Tarea no encontrada.");
            }
            return Ok(task);
        }

        // POST: api/Task
        /// <summary>
        /// Crea una nueva tarea.
        /// Solo accesible por el rol Administrador.
        /// </summary>
        /// <param name="newTask">Datos de la nueva tarea.</param>
        /// <returns>Mensaje de éxito o error.</returns>
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<Tarea>> CreateTask([FromBody] TaskDto newTask)
        {
            try
            {
                await _taskService.AddTaskAsync(newTask);
                return Ok("Tarea creada con éxito");
            }
            catch (Exception)
            {
                return BadRequest("No se pudo crear la tarea.");
            }
        }

        // PUT: api/Task/5
        /// <summary>
        /// Actualiza una tarea existente.
        /// Solo accesible por el rol Administrador.
        /// </summary>
        /// <param name="id">ID de la tarea a actualizar.</param>
        /// <param name="updatedTask">Datos actualizados de la tarea.</param>
        /// <returns>Mensaje de éxito o error.</returns>
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskDto updatedTask)
        {
            // Verifica que el ID proporcionado coincida con el de la tarea actualizada
            if (id != updatedTask.IdTask)
            {
                return BadRequest("El ID de la tarea no coincide.");
            }

            try
            {
                await _taskService.UpdateTaskAsync(updatedTask);
                return Ok("Tarea actualizada con éxito");
            }
            catch (Exception)
            {
                return BadRequest("No se pudo actualizar la tarea.");
            }
        }

        // DELETE: api/Task/5
        /// <summary>
        /// Elimina una tarea por su ID.
        /// Solo accesible por el rol Administrador.
        /// </summary>
        /// <param name="id">ID de la tarea a eliminar.</param>
        /// <returns>Mensaje de éxito o error.</returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                await _taskService.DeleteTaskAsync(id);
                return Ok("Tarea eliminada con éxito");
            }
            catch (Exception)
            {
                return BadRequest("No se pudo eliminar la tarea.");
            }
        }
    }
}
