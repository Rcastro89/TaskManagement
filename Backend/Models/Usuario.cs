using System;
using System.Collections.Generic;

namespace TaskManagementAPI.Models;

public partial class Usuario
{
    public int IdUser { get; set; }

    public string UserName { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public int? IdRole { get; set; }

    public virtual Role? IdRoleNavigation { get; set; }

    public virtual ICollection<UsuarioTarea> UsuarioTareas { get; set; } = new List<UsuarioTarea>();
}
