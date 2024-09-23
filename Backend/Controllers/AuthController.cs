using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TaskManagementAPI.DTOs;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        // Constructor que inyecta el servicio de usuario para la autenticación
        public AuthController(IUserService userService)
        {
            _userService = userService; // Inicializa el servicio de usuario
        }

        // POST: api/auth/login
        /// <summary>
        /// Autentica al usuario y devuelve un token de acceso.
        /// </summary>
        /// <param name="login">Objeto que contiene las credenciales de inicio de sesión.</param>
        /// <returns>Token de acceso y rol del usuario en caso de éxito, o un error de autorización.</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            try
            {
                // Intenta autenticar al usuario y obtener el token
                AuthResponseDto result = await _userService.Authenticate(login);
                return Ok(new { Token = result.Token, Role = result.Role }); // Devuelve el token y el rol
            }
            catch (Exception)
            {
                // En caso de error, devuelve un estado 401 (Unauthorized) con un mensaje genérico
                return Unauthorized(new { error = "Credenciales no válidas." });
            }
        }
    }
}
