-- Crear la base de datos 'Zappas' 
CREATE DATABASE zappas;

-- Conectar a la base de datos 'Zappas' 
\c zappas;

-- ------------------------------------------------------
-- Creación de la tabla de usuarios
-- ------------------------------------------------------

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,                 -- ID único para cada usuario
    nombre VARCHAR(100) NOT NULL,          -- Nombre del usuario
    apellido VARCHAR(100) NOT NULL,        -- Apellido del usuario
    correo VARCHAR(100) UNIQUE NOT NULL,   -- Correo electrónico único
    contrasena VARCHAR(255) NOT NULL,      -- Contraseña del usuario (debe ser cifrada)
    direccion VARCHAR(255) NOT NULL,       -- Dirección del usuario
    region VARCHAR(100) NOT NULL,          -- Región
    ciudad VARCHAR(100) NOT NULL,          -- Ciudad
    comuna VARCHAR(100) NOT NULL,          -- Comuna
    foto_perfil VARCHAR(1000) DEFAULT NULL, -- Columna para la foto de perfil
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de última actualización
);

-- ------------------------------------------------------
-- Creación de la tabla de productos
-- ------------------------------------------------------

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,                -- ID único para cada producto
    usuario_id INT NOT NULL,              -- ID del usuario que publica el producto
    nombre VARCHAR(255) NOT NULL,         -- Nombre del producto
    descripcion TEXT,                     -- Descripción del producto
    precio DECIMAL(10, 2) NOT NULL,       -- Precio del producto
    condicion VARCHAR(50) NOT NULL,       -- Condición del producto (nuevo, usado, etc.)
    categoria VARCHAR(255),               -- Categoría del producto como texto
    marca VARCHAR(255),                   -- Marca del producto
    talla VARCHAR(255),                   -- Talla del producto
    ano INT,                              -- Año del producto
    imagenes TEXT[],                      -- Array para URLs de imágenes
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de última actualización
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE -- Relación con usuarios
);

-- ------------------------------------------------------
-- Creación de la tabla de consultas
-- ------------------------------------------------------

CREATE TABLE consultas (
    id SERIAL PRIMARY KEY,                -- ID único para cada consulta
    usuario_id INT NOT NULL,              -- ID del usuario que hace la consulta
    producto_id INT NOT NULL,             -- ID del producto consultado
    pregunta TEXT NOT NULL,               -- Pregunta del usuario
    respuesta TEXT,                       -- Respuesta del que consulta o el vendedor
    respondida BOOLEAN DEFAULT FALSE,     -- Estado de la consulta (respondida o no)
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de última actualización
    respondido_por INT,                   -- ID del usuario que responde
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE, -- Relación con usuarios
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE -- Relación con productos
);

-- ------------------------------------------------------
-- Creación de la tabla de órdenes
-- ------------------------------------------------------

CREATE TABLE ordenes (
    id SERIAL PRIMARY KEY,                -- ID único para cada orden
    usuario_id INT NOT NULL,              -- ID del usuario que realiza la compra
    precio_total DECIMAL(10, 2) NOT NULL, -- Precio total de la orden
    estado VARCHAR(50) DEFAULT 'pendiente', -- Estado de la orden
    direccion_envio TEXT,                -- Dirección de envío
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de última actualización
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ------------------------------------------------------
-- Creación de la tabla de detalles de órdenes
-- ------------------------------------------------------

CREATE TABLE detalles_orden (
    id SERIAL PRIMARY KEY,               -- ID único para cada detalle
    orden_id INT NOT NULL,               -- ID de la orden
    producto_id INT NOT NULL,            -- ID del producto comprado
    cantidad INT NOT NULL,               -- Cantidad del producto
    precio DECIMAL(10, 2) NOT NULL,      -- Precio del producto al momento de la compra
    FOREIGN KEY (orden_id) REFERENCES ordenes(id) ON DELETE CASCADE, -- Relación con órdenes
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE -- Relación con productos
);

-- ------------------------------------------------------
-- Creación de la tabla de pagos
-- ------------------------------------------------------

CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,               -- ID único para cada pago
    orden_id INT NOT NULL,               -- ID de la orden asociada
    monto DECIMAL(10, 2) NOT NULL,       -- Monto total del pago
    metodo_pago VARCHAR(50),             -- Método de pago
    estado_pago VARCHAR(50) DEFAULT 'pendiente', -- Estado del pago
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha del pago
    FOREIGN KEY (orden_id) REFERENCES ordenes(id) ON DELETE CASCADE
);

-- ------------------------------------------------------
-- Creación de la tabla de direcciones de envío
-- ------------------------------------------------------

CREATE TABLE direcciones_envio (
    id SERIAL PRIMARY KEY,               -- ID único para cada dirección
    usuario_id INT NOT NULL,             -- ID del usuario
    direccion TEXT NOT NULL,             -- Dirección de envío
    ciudad VARCHAR(100),                 -- Ciudad
    estado VARCHAR(100),                 -- Estado/Provincia
    codigo_postal VARCHAR(20),           -- Código postal
    pais VARCHAR(100),                   -- País
    es_predeterminada BOOLEAN DEFAULT FALSE, -- Es predeterminada
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de actualización
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ------------------------------------------------------
-- Creación de la tabla de favoritos
-- ------------------------------------------------------

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,               -- ID único para cada favorito
    usuario_id INT NOT NULL,             -- ID del usuario
    producto_id INT NOT NULL,            -- ID del producto favorito
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE, -- Relación con usuarios
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE -- Relación con productos
);