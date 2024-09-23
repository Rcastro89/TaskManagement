using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Models;
using TaskManagementAPI.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TaskManagementAPI.Controllers
{
    // Asegura que solo los usuarios autorizados puedan acceder a este controlador
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRolesService _rolesService; // Servicio para gestionar roles

        // Constructor que inyecta el servicio de roles
        public RoleController(IRolesService rolesService)
        {
            _rolesService = rolesService; // Inicializa el servicio de roles
        }

        // GET: api/roles
        /// <summary>
        /// Obtiene todos los roles disponibles en el sistema.
        /// </summary>
        /// <returns>Lista de roles en caso de éxito, o un error en caso de fallo.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {
            try
            {
                // Intenta obtener todos los roles a través del servicio
                var roleList = await _rolesService.GetAllRolesAsync();
                return Ok(roleList); // Devuelve la lista de roles
            }
            catch (Exception)
            {
                // En caso de error, devuelve un estado 400 (Bad Request) con un mensaje genérico
                return BadRequest("No se pudieron obtener los roles.");
            }
        }
    }
}
