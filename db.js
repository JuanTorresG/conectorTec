// Importa dotenv para el manejo de variables de entorno
import dotenv from "dotenv";
// Importa la función de formato de PostgreSQL para crear consultas dinámicas y seguras
import format from 'pg-format';
// Carga las variables de entorno del archivo .env
dotenv.config();

// Importa el paquete pg, que permite la conexión y manejo de la base de datos PostgreSQL
import pkg from 'pg';
// Desestructura Pool desde el paquete pg para manejar un pool de conexiones
const { Pool } = pkg;

// Configuración para la conexión a la base de datos usando variables de entorno
const configuracion = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
};

// Crea una instancia de Pool con la configuración para manejar conexiones
const pool = new Pool(configuracion);

export async function obtenerProductosPorIdCategoria(idCategoria, { minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER, sortOrder = '' }) {
    let orderClause;
    switch (sortOrder) {
        case 'priceLowHigh':
            orderClause = 'ORDER BY p.precio ASC';
            break;
        case 'priceHighLow':
            orderClause = 'ORDER BY p.precio DESC';
            break;
        default:
            orderClause = 'ORDER BY COALESCE(AVG(r.puntuacion), 0) DESC, COUNT(r.id_resena) DESC'; // Orden predeterminado por calificación y número de reseñas
            break;
    }

    const query = format(`
        SELECT 
            p.id_producto, 
            p.nombre, 
            p.precio,
            COALESCE(AVG(r.puntuacion), 0) AS calificacion,
            COUNT(r.id_resena) AS numresenias
        FROM 
            producto AS p
        JOIN 
            categoria AS c ON p.id_categoria = c.id_categoria
        LEFT JOIN 
            resenia AS r ON p.id_producto = r.id_producto
        WHERE 
            c.id_categoria = %L AND
            p.precio >= %L AND
            p.precio <= %L
        GROUP BY 
            p.id_producto
        %s
    `, idCategoria, minPrice, maxPrice, orderClause);

    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        throw error;
    }
}


// Función para obtener todos los productos
export async function obtenerProductos() {
    const resultado = await pool.query('SELECT * FROM PRODUCTO WHERE id_vendedor = 2');
    return resultado.rows;
}

export async function agregarProducto({ id_categoria, cantidad, nombre, precio, caracteristicas, descripcion}) {
    const query = format('INSERT INTO PRODUCTO (id_vendedor, id_categoria, cantidad, nombre, precio, caracteristicas, descripcion) VALUES (2, %L, %L, %L, %L, %L, %L)', id_categoria, cantidad, nombre, precio, caracteristicas, descripcion);
    const resultado = await pool.query(query);
    return resultado.rows;
}

// Función para eliminar un producto por su ID
export async function eliminarProducto(id_producto) {
    const query = format('DELETE FROM PRODUCTO WHERE id_producto = %L AND id_vendedor = 2', id_producto);
    const resultado = await pool.query(query);
    return resultado;
}

// Función para actualizar los datos de un producto
export async function actualizarProducto(id_producto, { id_categoria, cantidad, nombre, precio, caracteristicas, descripcion }) {
    const query = format('UPDATE PRODUCTO SET id_vendedor = 2, id_categoria = %L, cantidad = %L, nombre = %L, precio = %L, caracteristicas = %L, descripcion = %L WHERE id_producto = %L', id_categoria, cantidad, nombre, precio, caracteristicas, descripcion, id_producto);
    const resultado = await pool.query(query);
    return resultado;
}