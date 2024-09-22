namespace TaskManagementAPI.DTOs
{
    public class TaskDto
    {
        public int? IdTask { get; set; }
        public required string Title { get; set; }

        public string? Description { get; set; }
    }
}
