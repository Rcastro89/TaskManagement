namespace TaskManagementAPI.DTOs
{
    public class UpdateUserTaskStatusDto
    {
        public int IdUserTask {  get; set; }
        public required string Status { get; set; }
    }
}
