namespace TaskManagementAPI.DTOs
{
    /// <summary>
    /// DTO para representar los datos de un usuario en el sistema.
    /// </summary>
    public class UserDto
    {
        /// <summary>
        /// Identificador único del usuario. Este campo es opcional y puede ser nulo.
        /// </summary>
        public int? UserId { get; set; }

        /// <summary>
        /// Nombre de usuario requerido para la autenticación.
        /// Este campo es obligatorio.
        /// </summary>
        public required string UserName { get; set; }

        /// <summary>
        /// Hash de la contraseña del usuario. Este campo es opcional y puede ser nulo.
        /// Se utiliza para la autenticación segura.
        /// </summary>
        public string? PasswordHash { get; set; }

        /// <summary>
        /// Identificador del rol asociado al usuario. Este campo es obligatorio.
        /// </summary>
        public required int RoleId { get; set; }
    }
}
