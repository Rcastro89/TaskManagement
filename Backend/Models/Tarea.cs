using System;
using System.Collections.Generic;

namespace TaskManagementAPI.Models;

public partial class Tarea
{
    public int IdTask { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<UsuarioTarea> UsuarioTareas { get; set; } = new List<UsuarioTarea>();
}
