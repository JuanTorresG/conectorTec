import express from "express";
import cors from "cors";

import {
    obtenerProductosPorIdCategoria,
    obtenerProductos,
    agregarProducto,
    eliminarProducto,
    actualizarProducto
} from "./db.js";

const corsOption = {
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
};

const app = express();
app.use(express.json());
app.use(cors(corsOption));


app.get("/productos/:idCategoria", async (req, res) => {
    const { minPrice, maxPrice, sortOrder } = req.query;
    const idCategoria = parseInt(req.params.idCategoria);
    if (isNaN(idCategoria)) {
        return res.status(400).json({ mensaje: "ID de categoría inválido" });
    }

    try {
        const productos = await obtenerProductosPorIdCategoria(idCategoria, {
            minPrice: parseFloat(minPrice),
            maxPrice: parseFloat(maxPrice),
            sortOrder
        });
        res.json(productos);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ mensaje: "Error al obtener los productos", error: error.message });
    }
});


// Obtener todos los productos
app.get("/seller/productos", async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error: error.message });
    }
});

// Agregar un nuevo producto
app.post('/seller/productos', async (req, res) => {
    try {

        const { id_categoria, cantidad, nombre, precio, caracteristicas, descripcion } = req.body;
        await agregarProducto({ id_categoria, cantidad, nombre, precio, caracteristicas, descripcion});
        res.json({ mensaje: "Producto agregado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar el producto", error: error.message });
    }
});

// Eliminar un producto por su ID
app.delete("/seller/productos/:id_producto", async (req, res) => {
    try {
        await eliminarProducto(req.params.id_producto);
        res.json({ mensaje: "Producto eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
    }
});
// Actualizar los datos de un producto
app.put("/seller/productos/:id", async (req, res) => {
    try {
        await actualizarProducto(req.params.id, req.body);
        res.json({ mensaje: "Producto actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el producto", error: error.message });
    }
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});