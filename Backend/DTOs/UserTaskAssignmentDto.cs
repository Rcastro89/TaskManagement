namespace TaskManagementAPI.DTOs
{
    /// <summary>
    /// DTO para representar la asignación de una tarea a un usuario.
    /// </summary>
    public class UserTaskAssignmentDto
    {
        /// <summary>
        /// Identificador único del usuario al que se le asigna la tarea.
        /// Este campo es obligatorio.
        /// </summary>
        public required int UserId { get; set; }

        /// <summary>
        /// Identificador único de la tarea que se asigna.
        /// Este campo es obligatorio.
        /// </summary>
        public required int TaskId { get; set; }

        /// <summary>
        /// Estado de la tarea asignada. Este campo es obligatorio.
        /// </summary>
        public required string Status { get; set; }
    }
}
