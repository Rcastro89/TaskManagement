using System;
using System.Collections.Generic;

namespace TaskManagementAPI.Models;

public partial class Role
{
    public int IdRole { get; set; }

    public string? RoleName { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
