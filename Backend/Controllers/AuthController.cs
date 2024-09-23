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

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            try
            {
                AuthResponseDto result = await _userService.Authenticate(login);
                return Ok(new { Token = result.Token, Role = result.Role });
            }
            catch (Exception ex) 
            {
                return Unauthorized(new { error = ex.Message });
            }

        }
    }
}
