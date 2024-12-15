# Frontend - Proyecto Final

Este proyecto es la parte del frontend para la aplicación **Zappas**, un marketplace de zapatillas usadas. El frontend se encarga de la interacción del usuario, permitiendo la navegación, la visualización de productos y la gestión de pedidos. Está construido con **React** y utiliza **React Bootstrap** para el diseño de la interfaz.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org) (versión recomendada: LTS)

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/DICAVI86/ProyectoFinal_G60_Zappas
    cd frontend
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del directorio `frontend` si es necesario para configuraciones específicas (por ejemplo, URLs del backend).

## Uso

1. **Iniciar el servidor de desarrollo**:

    Para iniciar el servidor, ejecuta el siguiente comando:

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor de desarrollo en el puerto configurado por Vite (generalmente `http://localhost:5173`).

2. **Navegar por la aplicación**:

    Accede a la aplicación en tu navegador en la dirección indicada en la terminal. Desde allí podrás interactuar con la interfaz y probar las funcionalidades del frontend.

## Estructura del Proyecto

```
frontend/
├── public/        # Recursos estáticos
├── src/           # Código fuente de la aplicación
│   ├── assets/    # Recursos como imágenes e íconos
│   ├── components/ # Componentes reutilizables
│   ├── context/   # Manejo de contexto global
│   ├── views/     # Vistas principales
│   └── App.jsx    # Componente raíz
├── vite.config.js # Configuración de Vite
└── package.json   # Dependencias y scripts del proyecto
```

## Dependencias Principales

- **React**: Biblioteca para la construcción de interfaces de usuario.
- **React Router**: Manejo de rutas para la navegación de la aplicación.
- **React Bootstrap**: Componentes de diseño responsivo.
- **Axios**: Cliente HTTP para la comunicación con el backend.
- **FontAwesome**: Biblioteca de íconos para mejorar la experiencia visual.

## Scripts

El proyecto incluye los siguientes scripts útiles para desarrollo:

- **Iniciar servidor de desarrollo**: `npm run dev`
- **Construir para producción**: `npm run build`
- **Previsualizar la construcción**: `npm run preview`

## Próximos Pasos
- Completar las pruebas del frontend.
- Integrar el backend en el entorno de desarrollo local.

---

Este frontend fue desarrollado como parte del curso de Full Stack Developer en **Desafío Latam**.
