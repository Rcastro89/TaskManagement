namespace TaskManagementAPI.DTOs
{
    public class UserDto
    {
        public int? IdUser { get; set; }

        public required string UserName { get; set; }

        public string? PasswordHash { get; set; }

        public int IdRole { get; set; }
    }
}
