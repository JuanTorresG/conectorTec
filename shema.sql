CREATE TABLE CLIENTE(
    id_cliente SERIAL PRIMARY KEY,
    ciudad VARCHAR(50),
    direccion VARCHAR(50),
    telefono VARCHAR(10),
    nombre VARCHAR(50) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    pais VARCHAR(50),
    metodo_pago INT,
    correo VARCHAR(300) NOT NULL
);

CREATE TABLE VENDEDOR(
    id_vendedor SERIAL PRIMARY KEY,
    nombre_empresa VARCHAR(50) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    correo VARCHAR(300) NOT NULL,
    descripcion VARCHAR(500)
);

CREATE TABLE CATEGORIA(
    id_categoria SERIAL PRIMARY KEY,
    id_categoria_padre INT,
    nombre VARCHAR(50),
    descripcion VARCHAR(300),
    comision INT,
    FOREIGN KEY (id_categoria_padre) REFERENCES CATEGORIA(id_categoria)
);

CREATE TABLE PRODUCTO(
    id_producto SERIAL PRIMARY KEY,
    id_vendedor INT NOT NULL,
    id_categoria INT NOT NULL,
    cantidad INT,
    nombre VARCHAR(50),
    precio DECIMAL(10,2),
    imagen BYTEA,
    caracteristicas VARCHAR(500),
    descripcion VARCHAR(500),
    FOREIGN KEY (id_vendedor) REFERENCES VENDEDOR(id_vendedor),
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria)
);

CREATE TABLE RESENIA(
    id_resena SERIAL PRIMARY KEY,
    id_cliente INT,
    id_producto INT,
    comentario VARCHAR(300),
    fecha TIMESTAMP,
    puntuacion INT,
    titulo VARCHAR(100),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);

CREATE TABLE PEDIDO(
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    direccion_envio VARCHAR(50),
    total DECIMAL(10,2),
    fecha TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
);

CREATE TABLE DETALLE_PEDIDO(
    id_detalle SERIAL PRIMARY KEY,
    id_producto INT NOT NULL,
    id_pedido INT NOT NULL,
    cantidad INT,
    estado INT,
    precio_envio DECIMAL(10,2),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    FOREIGN KEY (id_pedido) REFERENCES PEDIDO(id_pedido)
);

--Igual =
SELECT * FROM CLIENTE WHERE pais = 'México';

--No Igual (<> o !=)
SELECT * FROM VENDEDOR WHERE nombre_empresa <> 'Tech Gadgets';

--Menor que (<)
SELECT * FROM PRODUCTO WHERE precio < 100.00;

--Mayor que (>)
SELECT * FROM PRODUCTO WHERE cantidad > 50;

--Menor o igual que (<=)
SELECT * FROM RESENIA WHERE puntuacion <= 3;

--Mayor o igual que (>=)
SELECT * FROM PEDIDO WHERE total >= 500.00;

--LIKE (patrones)
SELECT * FROM CLIENTE WHERE nombre LIKE 'Juan%';

--BETWEEN
SELECT * FROM PRODUCTO WHERE precio BETWEEN 50 AND 150;

--IN
SELECT * FROM CLIENTE WHERE ciudad IN ('Paris', 'Berlin', 'Madrid');

--IS NULL
SELECT * FROM CLIENTE WHERE metodo_pago IS NULL;

--IS NOT NULL
SELECT * FROM CLIENTE WHERE metodo_pago IS NOT NULL;

--COUNT()
SELECT COUNT(*) FROM CLIENTE;

--SUM()
SELECT SUM(total) FROM PEDIDO;

--MIN()
SELECT MIN(precio) FROM PRODUCTO;

--AVG()
SELECT AVG(precio) FROM PRODUCTO;

SELECT id_vendedor, COUNT(*) AS num_productos FROM PRODUCTO GROUP BY id_vendedor;

SELECT id_vendedor, COUNT(*) AS num_productos FROM PRODUCTO GROUP BY id_vendedor HAVING COUNT(*) > 5;

SELECT * FROM CLIENTE ORDER BY nombre;

SELECT id_categoria, AVG(precio) AS precio_promedio FROM PRODUCTO GROUP BY id_categoria ORDER BY precio_promedio DESC;

SELECT id_categoria, COUNT(*) AS num_productos
FROM PRODUCTO
GROUP BY id_categoria
HAVING COUNT(*) > 0
ORDER BY num_productos DESC;

SELECT id_cliente, SUM(total) AS total_ventas
FROM PEDIDO
GROUP BY id_cliente
ORDER BY total_ventas DESC;

SELECT id_cliente, COUNT(*) AS num_pedidos
FROM PEDIDO
GROUP BY id_cliente
HAVING COUNT(*) >= 1
ORDER BY num_pedidos DESC;

SELECT id_producto, AVG(puntuacion) AS promedio_puntuacion, COUNT(id_resena) AS num_resenas
FROM RESENIA
GROUP BY id_producto
HAVING AVG(puntuacion) > 3 AND COUNT(id_resena) >= 1
ORDER BY promedio_puntuacion DESC;

SELECT id_vendedor, AVG(precio) AS precio_promedio
FROM PRODUCTO
GROUP BY id_vendedor
HAVING COUNT(id_producto) > 0
ORDER BY precio_promedio ASC;

SELECT pais, COUNT(*) AS num_clientes
FROM CLIENTE
GROUP BY pais
HAVING COUNT(*) > 0
ORDER BY pais;

