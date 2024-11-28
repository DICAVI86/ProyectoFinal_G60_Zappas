-- Crear la base de datos 'Zappas' 
CREATE DATABASE Zappas;

-- Conectar a la base de datos 'Zappas'
\c Zappas;

-- ------------------------------------------------------
-- Creación de la tabla de usuarios
-- ------------------------------------------------------

CREATE TABLE users (
    id SERIAL PRIMARY KEY,         -- ID único para cada usuario
    name VARCHAR(100) NOT NULL,     -- Nombre del usuario
    email VARCHAR(100) UNIQUE NOT NULL,  -- Correo electrónico único
    password VARCHAR(255) NOT NULL,  -- Contraseña del usuario (debe ser cifrada)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Fecha de última actualización
);

-- ------------------------------------------------------
-- Creación de la tabla de productos
-- ------------------------------------------------------

CREATE TABLE products (
    id SERIAL PRIMARY KEY,            -- ID único para cada producto
    user_id INT NOT NULL,             -- ID del usuario que publica el producto
    name VARCHAR(255) NOT NULL,       -- Nombre del producto
    description TEXT,                 -- Descripción del producto
    price DECIMAL(10, 2) NOT NULL,    -- Precio del producto
    condition VARCHAR(50) NOT NULL,   -- Condición del producto (nuevo, usado, etc.)
    category_id INT,                  -- ID de la categoría del producto (opcional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de última actualización
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- Relación con usuarios
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL  -- Relación con categorías
);

-- ------------------------------------------------------
-- Creación de la tabla de categorías (opcional)
-- ------------------------------------------------------

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,         -- ID único para cada categoría
    name VARCHAR(100) NOT NULL,     -- Nombre de la categoría (ej. "Deportivas", "Casuales")
    description TEXT                -- Descripción de la categoría
);

-- ------------------------------------------------------
-- Creación de la tabla de consultas (inquiries)
-- ------------------------------------------------------

CREATE TABLE inquiries (
    id SERIAL PRIMARY KEY,            -- ID único para cada consulta
    user_id INT NOT NULL,             -- ID del usuario que hace la consulta
    product_id INT NOT NULL,          -- ID del producto sobre el que se hace la consulta
    question TEXT NOT NULL,           -- Pregunta del usuario
    answer TEXT,                      -- Respuesta del vendedor (opcional inicialmente)
    answered BOOLEAN DEFAULT FALSE,   -- Estado de la consulta (respondida o no)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de última actualización
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- Relación con usuarios
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE  -- Relación con productos
);

-- ------------------------------------------------------
-- Creación de la tabla de órdenes (orders)
-- ------------------------------------------------------

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,            -- ID único para cada orden
    user_id INT NOT NULL,             -- ID del usuario que hace la compra
    total_price DECIMAL(10, 2) NOT NULL,  -- Precio total de la orden
    status VARCHAR(50) DEFAULT 'pending',  -- Estado de la orden (pendiente, completada, cancelada)
    shipping_address TEXT,             -- Dirección de envío
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de última actualización
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- Relación con usuarios
);

-- ------------------------------------------------------
-- Creación de la tabla de detalles de la orden (order_items)
-- ------------------------------------------------------

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,            -- ID único para cada detalle
    order_id INT NOT NULL,            -- ID de la orden a la que pertenece
    product_id INT NOT NULL,          -- ID del producto comprado
    quantity INT NOT NULL,            -- Cantidad del producto
    price DECIMAL(10, 2) NOT NULL,    -- Precio del producto al momento de la compra
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,  -- Relación con órdenes
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE  -- Relación con productos
);

-- ------------------------------------------------------
-- Creación de la tabla de pagos (payments)
-- ------------------------------------------------------

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,            -- ID único para cada pago
    order_id INT NOT NULL,            -- ID de la orden asociada al pago
    amount DECIMAL(10, 2) NOT NULL,   -- Monto total del pago
    payment_method VARCHAR(50),       -- Método de pago (tarjeta, PayPal, etc.)
    payment_status VARCHAR(50) DEFAULT 'pending',  -- Estado del pago (pendiente, completado, fallido)
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha del pago
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE  -- Relación con órdenes
);

-- ------------------------------------------------------
-- Creación de la tabla de direcciones de envío (shipping_addresses)
-- ------------------------------------------------------

CREATE TABLE shipping_addresses (
    id SERIAL PRIMARY KEY,            -- ID único para cada dirección
    user_id INT NOT NULL,             -- ID del usuario
    address TEXT NOT NULL,            -- Dirección de envío
    city VARCHAR(100),                -- Ciudad
    state VARCHAR(100),               -- Estado/Provincia
    postal_code VARCHAR(20),          -- Código postal
    country VARCHAR(100),             -- País
    is_default BOOLEAN DEFAULT FALSE, -- Dirección predeterminada (sí/no)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de última actualización
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- Relación con usuarios
);

-- ------------------------------------------------------
-- Creación de la tabla de favoritos (favorites)
-- ------------------------------------------------------

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,            -- ID único para cada favorito
    user_id INT NOT NULL,             -- ID del usuario que agrega el favorito
    product_id INT NOT NULL,          -- ID del producto agregado a favoritos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- Relación con usuarios
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE  -- Relación con productos
);