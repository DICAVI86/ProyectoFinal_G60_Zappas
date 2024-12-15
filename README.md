# Zappas - Marketplace de Zapatillas Usadas

**Zappas** es un marketplace responsivo para la compra y venta de zapatillas usadas. Este proyecto combina un backend robusto con un frontend dinámico, demostrando las capacidades técnicas en el desarrollo Full Stack. Fue desarrollado como parte del curso de **Full Stack Developer** de **Desafío Latam**.

## Tabla de Contenidos
- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos e Instalación](#requisitos-e-instalación)
- [Despliegue](#despliegue)
- [Próximos Pasos](#próximos-pasos)

## Descripción General

Zappas ofrece una plataforma para conectar compradores y vendedores de zapatillas usadas. Incluye funcionalidades como autenticación de usuarios, publicación de productos, búsqueda avanzada y gestión de pedidos. La arquitectura separa frontend y backend, lo que facilita el mantenimiento y escalabilidad del proyecto.

## Características Principales
- Registro e inicio de sesión con autenticación JWT.
- Publicación, búsqueda y filtrado de zapatillas usadas.
- Carrito de compras para gestionar adquisiciones.
- Diseño responsivo para dispositivos móviles y escritorio.
- API REST para la comunicación entre frontend y backend.

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca para la construcción de interfaces de usuario.
- **React Router**: Navegación entre páginas.
- **React Bootstrap**: Diseño y componentes responsivos.
- **Axios**: Cliente HTTP para el consumo del backend.
- **FontAwesome**: Biblioteca de íconos.
- **Vite**: Herramienta de desarrollo y construcción.

### Backend
- **Node.js**: Entorno de ejecución del servidor.
- **Express**: Framework para construir la API REST.
- **PostgreSQL**: Base de datos relacional.
- **jsonwebtoken**: Manejo de autenticación con tokens.
- **bcryptjs**: Encriptación de contraseñas.
- **dotenv**: Gestión de configuraciones sensibles.
- **Morgan**: Middleware para registrar solicitudes HTTP.

### Pruebas
- **Jest** y **Supertest**: Pruebas del backend.

## Estructura del Proyecto

```
Zappas/
├── backend/           # Backend de la aplicación
│   ├── config/        # Configuración de la base de datos y global
│   ├── controllers/   # Controladores para la lógica del negocio
│   ├── middlewares/   # Middlewares personalizados
│   ├── routes/        # Rutas de la API
│   ├── services/      # Servicios para la lógica del servidor
│   ├── tests/         # Pruebas del backend
│   └── db.sql         # Script para inicializar la base de datos
├── frontend/          # Frontend de la aplicación
│   ├── public/        # Recursos estáticos
│   ├── src/           # Código fuente del frontend
│   └── vite.config.js # Configuración de Vite
├── README.md          # Documentación general del proyecto
└── package.json       # Dependencias del proyecto
```

## Requisitos e Instalación

### Requisitos
- **Node.js** (versión recomendada: LTS).
- **PostgreSQL** (versión 13 o superior).

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/DICAVI86/ProyectoFinal_G60_Zappas
   ```

2. Instalar las dependencias del frontend y backend:
   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

3. Configurar variables de entorno para el backend y, si aplica, para el frontend.

4. Iniciar los servidores:
   - **Frontend**:
     ```bash
     cd frontend
     npm run dev
     ```
   - **Backend**:
     ```bash
     cd backend
     npm start
     ```

## Despliegue
El proyecto está desplegado en **Render** para acceso público.

## Próximos Pasos
- Completar pruebas unitarias en el frontend.
- Refinar el diseño responsivo en dispositivos móviles.
- Agregar documentación adicional para desarrolladores contribuyentes.

---

**Zappas** es un proyecto desarrollado por:
- **Diego Castillo Vial**
- **Sebastián Villena**
