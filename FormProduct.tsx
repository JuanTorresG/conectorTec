import axios from 'axios';
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from 'react';
import { SellerActions, SellerState } from '../reducers/seller-reducer';
import { Producto, ProductoForm } from '../types';


type FormProductProps = {
    dispatch: Dispatch<SellerActions>;
    state: SellerState;
}

const initialState: Producto = {
    cantidad: 0,
    id_producto: -1,
    id_categoria: 0,
    nombre: '',
    precio: 0.0,
    caracteristicas: '',
    descripcion: '',
    imagen: null
}

export default function FormProduct({ state, dispatch }: FormProductProps) {
    const [producto, setProducto] = useState<ProductoForm>(initialState);
    
    useEffect(() => {
        if (state.id !== -1) {
            const selectProducto = state.productos.filter(stateProducto => stateProducto.id_producto === state.id)[0];
            setProducto(selectProducto);
        }
    }, [state.id])

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProducto(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProducto(prev => ({ ...prev, imagen: file }));
        }
    };

    const handleSubmit =(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(state.id !== -1 ){
            dispatch({type: 'edit-product', payload: {editedProduct: producto}})
        }else{
            dispatch({ type: 'save-product', payload: { newProduct: producto } });
        }
        
        setProducto({...initialState});
    };

    return (
        <div className="container mx-auto p-4 w-1/2">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Registrar Producto</h2>
                <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                        Categoría ID:
                        <input
                            type="number"
                            name="id_categoria"
                            value={producto.id_categoria} 
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        Cantidad:
                        <input
                            type="number"
                            name="cantidad"
                            value={producto.cantidad}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        Nombre:
                        <input
                            type="text"
                            name="nombre"
                            value={producto.nombre}
                            onChange={handleChange}
                            maxLength={50}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        Precio:
                        <input
                            type="number"
                            name="precio"
                            value={producto.precio}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block col-span-2">
                        Características:
                        <textarea
                            name="caracteristicas"
                            value={producto.caracteristicas}
                            onChange={handleChange}
                            maxLength={500}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block col-span-2">
                        Descripción:
                        <textarea
                            name="descripcion"
                            value={producto.descripcion}
                            onChange={handleChange}
                            maxLength={500}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block col-span-2">
                        Imagen:
                        <input
                            type="file"
                            name="imagen"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <button type="submit" className="mt-6 w-full rounded-md py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer uppercase transition-colors duration-200">Registrar Producto</button>
            </form>
        </div>
    );
}
