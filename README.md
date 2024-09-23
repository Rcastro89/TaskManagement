# **README - Arquitectura del Sistema**

## **Introducción**
Este proyecto es una aplicación web que consiste en un frontend desarrollado en **React** y un backend en **ASP.NET Core**, utilizando **Azure SQL Server** como base de datos. La aplicación permite gestionar usuarios y asignar tareas a cada uno de ellos, con funcionalidades adicionales para autenticar y autorizar a los usuarios basados en roles.

### **Tecnologías Principales**
- **Frontend**:
  - React.js
  - Material UI
  - Axios para solicitudes HTTP
  - Context API para la gestión de estado
  - React Router para la navegación
- **Backend**:
  - ASP.NET Core (API RESTful)
  - Entity Framework Core (Database First)
  - Azure SQL Server
  - JWT (JSON Web Tokens) para autenticación

---

## **Arquitectura del Sistema**

### **Frontend**

El frontend está desarrollado en **React.js**, utilizando **Material UI** para los componentes de interfaz de usuario. La estructura del proyecto está organizada de la siguiente manera:

- **components**:
	- ChangePassword
	- CreateTask
	- CreateUser
	- CreateUserTask
	- Footer
	- Header
	- Home
	- Login
	- Task
	- Users
	- UserTasks
	
- **context**:
	- AuthContext
	- ChangePasswordContext
	- CreateTaskContext
	- CreateUserContext
	- CreateUserTaskContext
	- TaskContext
	- UserContext
	- UserTaskContext
	
- **services**:
	- AdminRoute
	- api
	- PrivateRoute
    
### **Carpetas del Frontend**

1. **components/**: 
   - Contiene todos los componentes principales de la interfaz de usuario, como los formularios de usuario y las listas de tareas. 
   
2. **context/**: 
   - Maneja el estado global de la aplicación mediante **Context API**. En esta carpeta se encuentran los contextos para la autenticación (`AuthContext`), la gestión de usuarios (`UserContext`), y la gestión de tareas (`TaskContext`).

3. **services/**: 
   - Aquí se define el archivo `api.js`, que configura **Axios** para realizar las solicitudes HTTP a la API del backend. También se implementa un interceptor para agregar automáticamente el token JWT a las cabeceras de las solicitudes. También se incluyen componentes específicos como `PrivateRoute` y `AdminRoute`, que controlan el acceso a rutas protegidas basadas en el estado de autenticación y el rol del usuario.

### **Backend**

El backend está desarrollado en **ASP.NET Core**, implementando una arquitectura basada en capas. El código está organizado de la siguiente manera:

- **Controllers**:
	- AuthController
	- RoleController
	- TaskController
	- UserController
	- UserTaskController
	
- **DTOs**:
	- AuthResponseDto
	- LoginDto
	- TaskDto
	- UpdatePasswordDto
	- UpdateUserTaskStatusDto
	- UserDto
	- UserTaskAssignmentDto

- **Models**:
	- ApplicationDbContext
	- Role
	- Tarea
	- Usuario
	- UsuarioTarea
	- VUsuario
	- VUsuarioTarea
	
- **Repositories**:
	- GenericRepository
	- IGenericRepository
	
- **Services**:
	- IRolesService
	- ITaskService
	- IUserService
	- IUserTaskService
	- PasswordService
	- RolesService
	- TaskService
	- UserService
	- UserTaskService
 
### **Carpetas del Backend**

1. **Controllers/**: 
   - Define los controladores que manejan las rutas y los endpoints de la API. Cada controlador se encarga de recibir las solicitudes HTTP, validar los datos entrantes y delegar la lógica de negocio a los servicios correspondientes.

2. **DTOs/**: 
   - Contiene los **Data Transfer Objects** que se utilizan para transferir datos entre el frontend y el backend. Estos DTOs permiten manejar los datos de manera más controlada, sin exponer directamente las entidades del modelo.

3. **Models/**: 
   - Define las entidades del sistema que mapean las tablas de la base de datos, tales como `User`, `Task`, y `UserTask` (relación muchos a muchos que permite asignar tareas a usuarios).

4. **Repositories/**: 
   - Implementa el **Patrón Repository**, encapsulando la lógica de acceso a datos. Las interfaces como `IUserRepository` definen los métodos que luego son implementados en clases concretas como `UserRepository`, facilitando el desacoplamiento y la reutilización de código.

5. **Services/**: 
   - Contiene la lógica de negocio de la aplicación. Los servicios implementan las interfaces correspondientes y se encargan de procesar los datos recibidos de los controladores, interactuando con los repositorios para realizar las operaciones necesarias.

---

## **Patrón de Diseño Utilizado**

La arquitectura del backend sigue el patrón **Repository-Service**, que separa claramente la lógica de acceso a datos, la lógica de negocio, y la capa de presentación (controladores).

### **Repository-Service Pattern**
- **Repository**: Se encarga de interactuar con la base de datos utilizando **Entity Framework Core**. En este proyecto, se optó por el enfoque **Database First**, lo que significa que el modelo de datos se actualiza directamente desde la base de datos existente.
  
- **Service**: Implementa la lógica de negocio del sistema, delegando la interacción con la base de datos a los repositorios.

Este patrón facilita el mantenimiento, la prueba unitaria, y el escalamiento de la aplicación, ya que cada capa tiene responsabilidades bien definidas.

---

## **Autenticación y Autorización**

La autenticación de usuarios se realiza mediante **JWT (JSON Web Tokens)**. Cuando un usuario inicia sesión, el backend genera un token JWT que se envía al frontend. Este token se almacena en el **localStorage** del navegador y se incluye en las cabeceras de todas las solicitudes posteriores mediante un interceptor de Axios en el frontend.

### **Protección de Rutas**

- **PrivateRoute**: Protege las rutas que requieren que el usuario esté autenticado.
- **AdminRoute**: Protege rutas que solo pueden ser accesadas por usuarios con rol de **Administrador**. En caso de que un usuario no tenga permisos, es redirigido a la página principal o una página específica.

---

## **Base de Datos**

La base de datos se implementa en **Azure SQL Server**. Las entidades principales del sistema incluyen:

1. **User**: Representa a los usuarios del sistema.
2. **Task**: Define las tareas que pueden ser asignadas a los usuarios.
3. **UserTask**: Tabla intermedia que representa la relación muchos a muchos entre usuarios y tareas.

### **Enfoque Database First**

Se utilizó **Entity Framework Core** con el enfoque **Database First** para generar automáticamente los modelos desde la base de datos existente y sincronizar cualquier cambio en el esquema. Esto permite mantener consistencia entre la base de datos y las entidades del backend.

---

## **Decisiones Técnicas y Consideraciones Especiales**

1. **Database First**: 
   - Decidimos utilizar el enfoque **Database First** para permitir que el equipo de desarrollo trabaje directamente con un esquema de base de datos existente, y asegurarnos de que cualquier cambio en la base de datos se refleje en el modelo de la aplicación.

2. **JWT para Seguridad**:
   - La autenticación mediante **JWT** garantiza que las solicitudes sean seguras y que los usuarios solo puedan acceder a recursos permitidos según su rol.

3. **Context API**: 
   - En el frontend, optamos por **Context API** para manejar el estado global de la aplicación en lugar de soluciones más complejas como Redux, dado que el tamaño del proyecto no requiere una gestión de estado tan sofisticada.

4. **Axios Interceptors**:
   - Implementamos **interceptores de Axios** en el frontend para agregar automáticamente el token JWT a todas las solicitudes, simplificando el código y mejorando la seguridad.

5. **Protección de Rutas**:
   - Para garantizar que solo los usuarios autenticados y autorizados puedan acceder a ciertas páginas, implementamos componentes como `PrivateRoute` y `AdminRoute` en React.

---

## **Conclusión**

Este proyecto sigue una arquitectura modular y bien estructurada que separa claramente las responsabilidades entre el frontend y el backend, utilizando las mejores prácticas de la industria como **JWT** para autenticación, **Context API** para la gestión del estado en el frontend, y **Repository-Service Pattern** en el backend. Las decisiones técnicas tomadas aseguran que la aplicación sea escalable, mantenible, y fácil de expandir en el futuro.
