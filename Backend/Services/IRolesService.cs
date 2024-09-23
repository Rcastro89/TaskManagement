using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TaskManagementAPI.Services
{
    /// <summary>
    /// Interfaz para el servicio de gestión de roles.
    /// </summary>
    public interface IRolesService
    {
        /// <summary>
        /// Obtiene todos los roles disponibles en el sistema de manera asíncrona.
        /// </summary>
        /// <returns>Una lista de roles.</returns>
        Task<IEnumerable<Role>> GetAllRolesAsync();
    }
}
