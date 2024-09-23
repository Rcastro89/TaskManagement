using System.Collections.Generic;
using System.Threading.Tasks;

/// <summary>
/// Interfaz genérica para un repositorio que define operaciones CRUD básicas.
/// </summary>
/// <typeparam name="T">Tipo de entidad.</typeparam>
public interface IGenericRepository<T> where T : class
{
    /// <summary>
    /// Obtiene todos los elementos de tipo T.
    /// </summary>
    /// <returns>Una tarea que representa la operación asincrónica, con una colección de entidades de tipo T.</returns>
    Task<IEnumerable<T>> GetAllAsync();

    /// <summary>
    /// Obtiene una entidad por su ID.
    /// </summary>
    /// <param name="id">ID de la entidad a buscar.</param>
    /// <returns>Una tarea que representa la operación asincrónica, con la entidad de tipo T.</returns>
    Task<T> GetByIdAsync(int id);

    /// <summary>
    /// Agrega una nueva entidad al repositorio.
    /// </summary>
    /// <param name="entity">Entidad a agregar.</param>
    /// <returns>Una tarea que representa la operación asincrónica.</returns>
    Task AddAsync(T entity);

    /// <summary>
    /// Actualiza una entidad existente en el repositorio.
    /// </summary>
    /// <param name="entity">Entidad a actualizar.</param>
    /// <returns>Una tarea que representa la operación asincrónica.</returns>
    Task UpdateAsync(T entity);

    /// <summary>
    /// Elimina una entidad por su ID.
    /// </summary>
    /// <param name="id">ID de la entidad a eliminar.</param>
    /// <returns>Una tarea que representa la operación asincrónica.</returns>
    Task DeleteAsync(int id);
}
