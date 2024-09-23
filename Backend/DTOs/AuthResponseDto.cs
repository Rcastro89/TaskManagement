namespace TaskManagementAPI.DTOs
{
    /// <summary>
    /// DTO para la respuesta de autenticación del usuario.
    /// </summary>
    public class AuthResponseDto
    {
        /// <summary>
        /// Token de acceso generado para el usuario autenticado.
        /// </summary>
        public string? Token { get; set; }

        /// <summary>
        /// Rol del usuario autenticado en el sistema.
        /// </summary>
        public string? Role { get; set; }
    }
}
