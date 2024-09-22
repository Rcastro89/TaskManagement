namespace TaskManagementAPI.DTOs
{
    public class UserTaskAssignmentDto
    {
        public int IdUser { get; set; }
        public int IdTask { get; set; }
        public required string Status { get; set; }
    }
}
