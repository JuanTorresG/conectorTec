INSERT INTO CLIENTE (ciudad, direccion, telefono, nombre, contrasenia, pais, metodo_pago, correo) VALUES
('Ciudad de México', 'Calle 123', '5551234', 'Juan Pérez', 'password123', 'México', 1, 'juanperez@mail.com'),
('Bogotá', 'Avenida 47', '3109876', 'Ana Gómez', 'ana2024', 'Colombia', 2, 'anagomez@mail.com'),
('Buenos Aires', 'Calle 90', '1198765', 'Lucas Martínez', 'lm7890', 'Argentina', 1, 'lucasm@mail.com'),
('Santiago', 'Pasaje 12', '9845612', 'María Rivera', 'mariaR123', 'Chile', 3, 'maria.rivera@mail.com'),
('Lima', 'Avenida Sol 45', '5678945', 'Carlos Flores', 'cflorespass', 'Perú', 2, 'carlosf@mail.com');

INSERT INTO VENDEDOR (nombre_empresa, contrasenia, correo, descripcion) VALUES
('ElectroMax', 'em12345', 'contact@electromax.com', 'Electrodomésticos y más'),
('GamerZone', 'gz2024', 'sales@gamerzone.com', 'Todo para el gaming'),
('MueblesCo', 'muebles123', 'info@mueblesco.com', 'Muebles de alta calidad'),
('TechOnline', 'tech789', 'contacto@techonline.com', 'Última tecnología al alcance'),
('LibrosLibros', 'librosxyz', 'ventas@libroslibros.com', 'Un mundo de libros');

INSERT INTO CATEGORIA (nombre, descripcion, comision, id_categoria_padre) VALUES
('Electrónica', 'Dispositivos electrónicos', 10, NULL),
('Muebles', 'Todo tipo de muebles', 12, NULL),
('Videojuegos', 'Consolas y videojuegos', 15, NULL),
('Libros', 'Libros de todos los géneros', 8, NULL),
('Computación', 'Hardware y accesorios de computadora', 10, 1);

INSERT INTO PRODUCTO (id_vendedor, id_categoria, cantidad, nombre, precio, descripcion) VALUES
(1, 1, 20, 'Smartphone XYZ', 299.99, 'Smartphone con cámara de alta resolución y pantalla AMOLED'),
(2, 3, 15, 'Consola de juegos ABC', 399.99, 'Consola de última generación con VR incluido'),
(3, 2, 10, 'Sofá reclinable', 499.99, 'Sofá de cuero con funciones de masaje'),
(4, 5, 30, 'Mouse Gamer', 25.99, 'Mouse ergonómico con DPI ajustable'),
(5, 4, 50, 'Novela histórica', 19.99, 'Libro de aventuras en tiempos medievales');

INSERT INTO RESENIA (id_cliente, id_producto, comentario, fecha, puntuacion, titulo) VALUES
(1, 1, 'Excelente producto y entrega rápida.', '2024-04-10 14:30:00', 5, 'Muy satisfecho'),
(2, 2, 'La consola tiene un rendimiento increíble.', '2024-04-12 16:00:00', 4, 'Recomendado'),
(3, 3, 'El sofá es muy cómodo pero tardó en llegar.', '2024-04-15 12:20:00', 3, 'Bien pero lento'),
(4, 4, 'Gran mouse para gaming, precisión perfecta.', '2024-04-18 17:45:00', 5, 'Perfecto para gamers'),
(5, 5, 'Una novela que te atrapa de principio a fin.', '2024-04-20 20:00:00', 5, 'Fascinante');

INSERT INTO PEDIDO (id_cliente, direccion_envio, total, fecha) VALUES
(1, 'Calle 123, Ciudad de México', 299.99, '2024-04-10 13:00:00'),
(2, 'Avenida 47, Bogotá', 399.99, '2024-04-12 15:00:00'),
(3, 'Calle 90, Buenos Aires', 499.99, '2024-04-15 11:30:00'),
(4, 'Pasaje 12, Santiago', 25.99, '2024-04-18 16:50:00'),
(5, 'Avenida Sol 45, Lima', 19.99, '2024-04-20 19:00:00');

INSERT INTO DETALLE_PEDIDO (id_producto, id_pedido, cantidad, estado, precio_envio) VALUES
(1, 1, 1, 1, 10.00),
(2, 2, 1, 1, 15.00),
(3, 3, 1, 2, 20.00),
(4, 4, 1, 1, 5.00),
(5, 5, 1, 2, 3.00);


INSERT INTO PRODUCTO (id_vendedor, id_categoria, cantidad, nombre, precio, descripcion) VALUES
(2, 3, 15, 'Consola de juegos ABC', 399.99, 'Consola de última generación con VR incluido'),