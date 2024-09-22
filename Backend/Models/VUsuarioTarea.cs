using System;
using System.Collections.Generic;

namespace TaskManagementAPI.Models;

public partial class VUsuarioTarea
{
    public int IdUserTask { get; set; }

    public int IdUser { get; set; }

    public string UserName { get; set; } = null!;

    public int IdTask { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string Status { get; set; } = null!;
}
