using Microsoft.AspNetCore.Identity;

namespace TaskManagementAPI.Services
{
    /// <summary>
    /// Servicio para gestionar el hashing y verificación de contraseñas.
    /// </summary>
    public class PasswordService
    {
        private readonly PasswordHasher<object> _passwordHasher; // Instancia de PasswordHasher para manejar el hashing

        /// <summary>
        /// Constructor del servicio que inicializa el PasswordHasher.
        /// </summary>
        public PasswordService()
        {
            _passwordHasher = new PasswordHasher<object>(); // Inicializa el hasher
        }

        /// <summary>
        /// Hashea una contraseña dada.
        /// </summary>
        /// <param name="password">La contraseña a hashear.</param>
        /// <returns>La contraseña hasheada.</returns>
        public string HashPassword(string password)
        {
            try
            {
                return _passwordHasher.HashPassword(null, password); // Hashea la contraseña
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new InvalidOperationException("Error al hashear la contraseña.", ex);
            }
        }

        /// <summary>
        /// Verifica si una contraseña dada coincide con una contraseña hasheada.
        /// </summary>
        /// <param name="hashedPassword">La contraseña hasheada.</param>
        /// <param name="password">La contraseña a verificar.</param>
        /// <returns>True si la contraseña es válida, de lo contrario, false.</returns>
        public bool VerifyPassword(string hashedPassword, string password)
        {
            try
            {
                var result = _passwordHasher.VerifyHashedPassword(null, hashedPassword, password);
                return result == PasswordVerificationResult.Success; // Devuelve true si la verificación es exitosa
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new InvalidOperationException("Error al verificar la contraseña.", ex);
            }
        }
    }
}
