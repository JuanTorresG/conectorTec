import { StarIcon } from "@heroicons/react/24/outline";
import { ProductoCategoria } from "../types";

export default function Producto(producto: ProductoCategoria) {

  function renderStars(calificacion: number) {
    const estrellas = [];
    for (let i = 0; i < 5; i++) {
      estrellas.push(
        <StarIcon
          key={i}
          className={`h-5 w-5 ${i < calificacion ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return estrellas;
  }

  return (
    <button className="p-3 bg-white shadow-lg rounded-lg hover:shadow-xl hover:cursor-pointer transition-shadow duration-300 text-left max-w-90 max-h-90">
      <img 
        src="./laptop.jpg" 
        alt="Laptop Lenovo" 
        className="w-full h-auto" 
      />
      <h3 
        className="text-lg font-semibold text-gray-600 line-clamp-2 overflow-hidden overflow-ellipsis">
        {producto.nombre}
      </h3>
      <p className="text-xl font-black">${producto.precio}</p>
      <div className="flex items-center mt-1">
        <div className="flex items-center">
          {renderStars(producto.calificacion)}
        </div>
        <span className="text-sm text-gray-600 ml-2">({producto.numresenias} reseñas)</span>
      </div>
    </button>
  );
}
