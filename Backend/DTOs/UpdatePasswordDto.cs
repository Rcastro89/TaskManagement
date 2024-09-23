namespace TaskManagementAPI.DTOs
{
    /// <summary>
    /// DTO para representar los datos necesarios para actualizar la contraseña de un usuario.
    /// </summary>
    public class UpdatePasswordDto
    {
        /// <summary>
        /// Identificador único del usuario cuya contraseña se desea actualizar.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Nueva contraseña del usuario.
        /// Este campo es obligatorio.
        /// </summary>
        public string NewPassword { get; set; }
    }
}
