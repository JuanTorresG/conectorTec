import axios from 'axios';
import Filtros from './Filtros';
import Producto from './Producto';
import { ProductoCategoria } from '../types';
import { useEffect, useState } from 'react';

export default function CategoryScreen() {
    const [products, setProducts] = useState<ProductoCategoria[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                // Asegúrate de que 'idCategoria' es obtenido de alguna manera, por ejemplo, de un estado o prop.
                const idCategoria = 5; // Asumiendo que obtenemos este ID de alguna manera como estado o prop.
    
                const params = new URLSearchParams({
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    sortOrder: sortOrder
                });
                const url = `http://localhost:8080/productos/${idCategoria}?${params.toString()}`;
                const respuesta = await axios.get(url);
                const productos = respuesta.data;
                setProducts(productos);
                console.log(productos);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        obtenerProductos();
    }, [minPrice, maxPrice, sortOrder]); // Dependencias del useEffect
    

    return (
        <div className="px-4 py-5 flex">
            <div className="w-1/6 pr-4">
                <Filtros minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
            </div>

            <div className="w-5/6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Productos Electrónicos</h1>
                    <div>
                        <label htmlFor="sortOrder" className="text-sm font-semibold mr-2">Ordenar Por:</label>
                        <select
                            id="sortOrder"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Predeterminado</option>
                            <option value="priceLowHigh">Menor a Mayor</option>
                            <option value="priceHighLow">Mayor a Menor</option>
                        </select>
                    </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((producto) => (
                        <Producto {...producto} key={producto.id_producto}/>
                    ))}
                </div>
            </div>
        </div>
    );
};
