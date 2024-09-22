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
            var token = await _userService.Authenticate(login);
            if (token.StartsWith("Error:"))
            {
                return Unauthorized(token);
            }

            return Ok(new { Token = token });
        }
    }
}
