import { Dispatch, useMemo } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { SellerActions } from "../reducers/seller-reducer";
import { Producto } from "../types";

type ProductsListProps = {
  products: Producto[];
  dispatch: Dispatch<SellerActions>;
};

export default function ProductsList({ products, dispatch }: ProductsListProps) {
  const isEmpty = useMemo(() => products.length === 0, [products]);

  return (
    <div className="mx-auto w-full max-w-4xl ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Productos registrados
      </h2>
      <div className="flex gap-4">
      {isEmpty ? (
        <p className="text-gray-500 text-center">No hay productos registrados.</p>
      ) : (
        products.map((product, index) => (
          <div
            key={index}
            className="mb-6 p-4 shadow-lg rounded-lg bg-white justify-between items-center max-w-72 max-h-92"
          >
            <div>
              <img  src="./no-photo.jpg" alt="asd" />
              <h3 className="text-xl text-slate-900 font-bold mb-2">
                {product.nombre}
              </h3>
              <p className="text-gray-600">
                Cantidad:{" "}
                <span className="text-gray-800 font-medium">
                  {product.cantidad}
                </span>
              </p>
              <p className="text-gray-600">
                Precio:{" "}
                <span className="text-green-600 font-medium">
                  ${product.precio}
                </span>
              </p>
              <p className="text-gray-600">
                Descripción:{" "}
                <span className="text-gray-800 font-medium">
                  {product.descripcion}
                </span>
              </p>
            </div>
            <div className="flex gap-4">
              <button
                aria-label="Editar"
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() =>
                  dispatch({
                    type: "set-id-product",
                    payload: { id: product.id_producto },
                  })
                }
              >
                <PencilIcon className="h-6 w-6 text-blue-500" />
              </button>
              <button
                aria-label="Eliminar"
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() =>
                  dispatch({
                    type: "delete-product",
                    payload: { id_producto: product.id_producto },
                  })
                }
              >
                <TrashIcon className="h-6 w-6 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}
