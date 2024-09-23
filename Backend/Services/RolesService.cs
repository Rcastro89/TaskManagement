using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    /// <summary>
    /// Servicio para gestionar roles en el sistema.
    /// </summary>
    public class RolesService : IRolesService
    {
        private readonly IGenericRepository<Role> _roleRepository; // Repositorio genérico para acceder a roles

        /// <summary>
        /// Constructor del servicio que inyecta el repositorio de roles.
        /// </summary>
        /// <param name="roleRepository">Repositorio genérico para roles.</param>
        public RolesService(IGenericRepository<Role> roleRepository)
        {
            _roleRepository = roleRepository; // Inicializa el repositorio
        }

        /// <summary>
        /// Obtiene todos los roles del sistema de forma asíncrona.
        /// </summary>
        /// <returns>Una lista de roles.</returns>
        public async Task<IEnumerable<Role>> GetAllRolesAsync()
        {
            try
            {
                return await _roleRepository.GetAllAsync(); // Obtiene todos los roles
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new InvalidOperationException("Error al obtener los roles.", ex);
            }
        }
    }
}
