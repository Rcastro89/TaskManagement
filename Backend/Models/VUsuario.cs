using System;
using System.Collections.Generic;

namespace TaskManagementAPI.Models;

public partial class VUsuario
{
    public int IdUser { get; set; }

    public string UserName { get; set; } = null!;

    public int IdRole { get; set; }

    public string? RoleName { get; set; }
}
