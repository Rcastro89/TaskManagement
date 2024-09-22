using System;
using System.Collections.Generic;

namespace TaskManagementAPI.Models;

public partial class UsuarioTarea
{
    public int IdUserTask { get; set; }

    public int IdUser { get; set; }

    public int IdTask { get; set; }

    public string Status { get; set; } = null!;

    public virtual Tarea IdTaskNavigation { get; set; } = null!;

    public virtual Usuario IdUserNavigation { get; set; } = null!;
}
