namespace TaskManagementAPI.DTOs
{
    /// <summary>
    /// DTO para los datos de inicio de sesión del usuario.
    /// </summary>
    public class LoginDto
    {
        /// <summary>
        /// Nombre de usuario del usuario que intenta iniciar sesión.
        /// </summary>
        public required string Username { get; set; }

        /// <summary>
        /// Contraseña del usuario que intenta iniciar sesión.
        /// </summary>
        public required string Password { get; set; }
    }
}
