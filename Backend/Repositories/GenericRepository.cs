using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementAPI.Models;

/// <summary>
/// Repositorio genérico para realizar operaciones CRUD sobre entidades.
/// </summary>
/// <typeparam name="T">Tipo de entidad.</typeparam>
public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly ApplicationDbContext _context; // Contexto de la base de datos
    private readonly DbSet<T> _dbSet; // Set de entidades para el tipo T

    /// <summary>
    /// Constructor que inicializa el contexto de la base de datos y el conjunto de entidades.
    /// </summary>
    /// <param name="context">Contexto de la base de datos.</param>
    public GenericRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>(); // Inicializa el conjunto de entidades
    }

    /// <summary>
    /// Obtiene todos los elementos de tipo T.
    /// </summary>
    /// <returns>Lista de entidades de tipo T.</returns>
    public async Task<IEnumerable<T>> GetAllAsync()
    {
        try
        {
            return await _dbSet.ToListAsync(); // Retorna la lista de entidades
        }
        catch (Exception ex)
        {
            // Manejo de excepciones
            throw new Exception("Error al obtener todos los elementos.", ex);
        }
    }

    /// <summary>
    /// Obtiene una entidad por su ID.
    /// </summary>
    /// <param name="id">ID de la entidad a buscar.</param>
    /// <returns>Entidad de tipo T o null si no se encuentra.</returns>
    public async Task<T> GetByIdAsync(int id)
    {
        try
        {
            return await _dbSet.FindAsync(id); // Busca y retorna la entidad
        }
        catch (Exception ex)
        {
            throw new Exception($"Error al obtener el elemento con ID {id}.", ex);
        }
    }

    /// <summary>
    /// Agrega una nueva entidad al contexto.
    /// </summary>
    /// <param name="entity">Entidad a agregar.</param>
    public async Task AddAsync(T entity)
    {
        try
        {
            await _dbSet.AddAsync(entity); // Agrega la entidad
            await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos
        }
        catch (Exception ex)
        {
            throw new Exception("Error al agregar la entidad.", ex);
        }
    }

    /// <summary>
    /// Actualiza una entidad existente en el contexto.
    /// </summary>
    /// <param name="entity">Entidad a actualizar.</param>
    public async Task UpdateAsync(T entity)
    {
        try
        {
            _dbSet.Update(entity); // Marca la entidad como modificada
            await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos
        }
        catch (Exception ex)
        {
            throw new Exception("Error al actualizar la entidad.", ex);
        }
    }

    /// <summary>
    /// Elimina una entidad por su ID.
    /// </summary>
    /// <param name="id">ID de la entidad a eliminar.</param>
    public async Task DeleteAsync(int id)
    {
        try
        {
            var entity = await GetByIdAsync(id); // Obtiene la entidad a eliminar
            if (entity != null)
            {
                _dbSet.Remove(entity); // Elimina la entidad
                await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos
            }
        }
        catch (Exception ex)
        {
            throw new Exception($"Error al eliminar el elemento con ID {id}.", ex);
        }
    }
}
