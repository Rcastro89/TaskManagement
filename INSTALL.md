# Guía de Instalación - Backend

## 1. Consumo de la API en Azure

Para facilitar las pruebas, puedes consumir la API directamente desde Azure. Está desplegada en el siguiente dominio:

```plaintext
https://rcastrotaskmanagement.azurewebsites.net/api
```
Este dominio será la URL base para realizar peticiones a la API desde el frontend o cualquier cliente HTTP como Postman.

## 2. Descarga del Repositorio

Para comenzar a trabajar con el proyecto localmente, primero debes clonar el repositorio en tu máquina. Usa el siguiente comando para clonar el repositorio:

```bash
git clone https://github.com/Rcastro89/TaskManagement.git
```

Una vez descargado, asegúrate de navegar a la carpeta del proyecto backend:

```bash
cd tu-repositorio/backend
```

## 3. Instalación de Dependencias

Antes de ejecutar el proyecto, necesitas instalar las dependencias. Asegúrate de tener el SDK de .NET instalado en tu máquina. Luego, en la carpeta del proyecto backend, ejecuta el siguiente comando:

```bash
dotnet restore
```

Este comando descargará todas las dependencias necesarias definidas en el archivo `*.csproj`.


## 6. Ejecución del Proyecto

Finalmente, puedes ejecutar el proyecto con el siguiente comando:

```bash
dotnet run
```

Esto iniciará la API y podrás acceder a ella en `http://localhost:5184` o el puerto que se haya configurado en tu proyecto.

# Guía de Instalación - Frontend

Para la parte del frontend, asegúrate de tener instalado Node.js y npm en tu máquina. Luego, navega a la carpeta del proyecto frontend y ejecuta los siguientes comandos para instalar las dependencias:

```bash
npm install
```

  
## 1. Configuración de la API en el Frontend

En la carpeta del proyecto frontend, busca el directorio Frontend\src\services\api.js que es el archivo donde se define la URL base para las peticiones a la API. Si quieres probar apuntando a la API en Azure App services asegura que la Url base sea la siguiente:

```bash
baseURL: 'https://rcastrotaskmanagement.azurewebsites.net/api'
```

Ahora si quieres usar la aplicación con el servidor de API local asegura que se vea así:

```bash
baseURL: 'http://localhost:5184/api' //cambia 5184 por el puerto que muestre tu aplicación de API local
```

## 2. Ejecución del Frontend

Una vez que todas las dependencias estén instaladas y la URL esté configurada, puedes ejecutar el frontend con el siguiente comando:

```bash
npm start
```

Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación en `http://localhost:3000` (o el puerto que se haya configurado).

El primer acceso lo puedes hacer con el usuario: **admin1**, contraseña: **test**

## Conclusión

Siguiendo estos pasos, deberías ser capaz de configurar y ejecutar el proyecto tanto en el backend como en el frontend. Si encuentras algún problema, asegúrate de revisar los mensajes de error en la consola y verificar tu configuración.
