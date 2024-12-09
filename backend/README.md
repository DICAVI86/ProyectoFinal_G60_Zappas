# Backend - Proyecto Final

Este proyecto es la parte del backend para la aplicación **Zappas**. Se encarga de manejar la autenticación de usuarios, el registro de productos y la gestión de pedidos. Está construido con Node.js y usa PostgreSQL como base de datos.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org) (versión recomendada: LTS)
- [PostgreSQL](https://www.postgresql.org) (versión recomendada: 13 o superior)

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/DICAVI86/ProyectoFinal_G60_Zappas
    cd backend
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y configura tus variables de entorno. El archivo debe tener el siguiente formato:

    ```env
    PORT=3000
    DATABASE_URL=postgres://usuario:contraseña@localhost:5432/zappas
    JWT_SECRET=mi-secreto-para-jwt
    ```

    - **PORT**: El puerto en el que el servidor de Node.js escuchará las solicitudes (puedes dejarlo en 3000 o cambiarlo a otro puerto si lo prefieres).
    - **DATABASE_URL**: La URL de conexión de tu base de datos PostgreSQL. Asegúrate de reemplazar `usuario`, `contraseña` y `zappas` con los valores correctos para tu entorno.
    - **JWT_SECRET**: La clave secreta utilizada para firmar los tokens JWT. Este valor debería ser único y privado.

    **Nota:** El archivo `.env` está incluido en el archivo `.gitignore`, por lo que no se debe versionar. Asegúrate de que este archivo esté en tu entorno local para evitar problemas con la configuración.

## Configuración de la Base de Datos

A continuación, se describen los pasos para configurar PostgreSQL:

1. **Instalar PostgreSQL**: Si aún no tienes PostgreSQL instalado, puedes descargarlo e instalarlo desde su [sitio oficial](https://www.postgresql.org/download/).

2. **Crear la base de datos**:

    Una vez que tengas PostgreSQL instalado, abre la terminal de PostgreSQL y ejecuta los comandos que se encuentran en el archivo db.sql para crear la base de datos

    ```bash
    psql -U postgres
    ```

    Si ya tienes PostgreSQL corriendo y configurado correctamente, asegúrate de que las credenciales en el archivo `.env` sean correctas.

## Uso

1. **Iniciar el servidor**:

    Para iniciar el servidor, simplemente ejecuta el siguiente comando:

    ```bash
    npm start
    ```

    Esto iniciará el servidor en el puerto especificado en el archivo `.env` (por defecto 3000).

2. **Realizar solicitudes HTTP**:

    El backend proporciona varias rutas para interactuar con la base de datos y manejar la autenticación de usuarios.

    - **POST /api/users/register**: Registra un nuevo usuario.
    - **POST /api/users/login**: Inicia sesión y obtiene un token JWT.
    - **GET /api/users**: Obtiene todos los usuarios (requiere un token JWT válido).

    Asegúrate de que tu servidor esté corriendo antes de hacer solicitudes.

## Scripts

El proyecto incluye algunos scripts útiles para realizar tareas comunes durante el desarrollo:

- **Iniciar el servidor**: `npm start`
- **Ejecutar las pruebas**: `npm test`