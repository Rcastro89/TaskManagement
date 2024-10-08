﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TaskManagementAPI.Models;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Tarea> Tareas { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<UsuarioTarea> UsuarioTareas { get; set; }

    public virtual DbSet<VUsuario> VUsuarios { get; set; }

    public virtual DbSet<VUsuarioTarea> VUsuarioTareas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=tcp:rcastro.database.windows.net,1433;Initial Catalog=TaskManagementDB;Persist Security Info=False;User ID=rcastroAdmin;Password=P4#sNz8@Wq!1Tf6;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.IdRole);

            entity.Property(e => e.IdRole).HasColumnName("idRole");
            entity.Property(e => e.RoleName).HasMaxLength(100);
        });

        modelBuilder.Entity<Tarea>(entity =>
        {
            entity.HasKey(e => e.IdTask);

            entity.Property(e => e.IdTask).HasColumnName("idTask");
            entity.Property(e => e.Title).HasMaxLength(200);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUser);

            entity.Property(e => e.IdRole).HasColumnName("idRole");
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.UserName).HasMaxLength(100);

            entity.HasOne(d => d.IdRoleNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRole)
                .HasConstraintName("FK_Usuarios_Roles");
        });

        modelBuilder.Entity<UsuarioTarea>(entity =>
        {
            entity.HasKey(e => e.IdUserTask);

            entity.Property(e => e.IdUserTask).HasColumnName("idUserTask");
            entity.Property(e => e.IdTask).HasColumnName("idTask");
            entity.Property(e => e.IdUser).HasColumnName("idUser");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsFixedLength();

            entity.HasOne(d => d.IdTaskNavigation).WithMany(p => p.UsuarioTareas)
                .HasForeignKey(d => d.IdTask)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UsuarioTareas_Tareas");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.UsuarioTareas)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UsuarioTareas_Usuarios");
        });

        modelBuilder.Entity<VUsuario>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vUsuarios");

            entity.Property(e => e.IdRole).HasColumnName("idRole");
            entity.Property(e => e.RoleName).HasMaxLength(100);
            entity.Property(e => e.UserName).HasMaxLength(100);
        });

        modelBuilder.Entity<VUsuarioTarea>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vUsuarioTareas");

            entity.Property(e => e.IdTask).HasColumnName("idTask");
            entity.Property(e => e.IdUser).HasColumnName("idUser");
            entity.Property(e => e.IdUserTask).HasColumnName("idUserTask");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.UserName).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
