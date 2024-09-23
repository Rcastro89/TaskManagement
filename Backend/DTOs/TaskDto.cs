namespace TaskManagementAPI.DTOs
{
    /// <summary>
    /// DTO para representar los datos de una tarea.
    /// </summary>
    public class TaskDto
    {
        /// <summary>
        /// Identificador único de la tarea.
        /// Puede ser nulo si se trata de una nueva tarea.
        /// </summary>
        public int? IdTask { get; set; }

        /// <summary>
        /// Título de la tarea.
        /// Este campo es obligatorio.
        /// </summary>
        public required string Title { get; set; }

        /// <summary>
        /// Descripción detallada de la tarea.
        /// Este campo es opcional.
        /// </summary>
        public string? Description { get; set; }
    }
}
