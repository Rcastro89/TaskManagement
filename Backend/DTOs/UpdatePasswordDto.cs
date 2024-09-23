namespace TaskManagementAPI.DTOs
{
    public class UpdatePasswordDto
    {
        public int idUser { get; set; }
        public string NewPassword { get; set; }
    }
}
