namespace TaskManagementAPI.DTOs
{
    /// <summary>
    /// DTO para representar los datos necesarios para actualizar el estado de una tarea de un usuario.
    /// </summary>
    public class UpdateUserTaskStatusDto
    {
        /// <summary>
        /// Identificador único de la tarea del usuario cuya estado se desea actualizar.
        /// </summary>
        public int UserTaskId { get; set; }

        /// <summary>
        /// Nuevo estado que se asignará a la tarea.
        /// Este campo es obligatorio.
        /// </summary>
        public required string Status { get; set; }
    }
}
