export type ProductoCategoria = {
  id_producto: number
  nombre: string;
  precio: number;
  calificacion: number;
  numresenias: number;
}

export type ProductoForm = {
  id_categoria: number;
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  caracteristicas: string;
  descripcion: string;
  imagen: File | null;
}

export type Producto = {
  id_producto: number;
  id_categoria: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number
  caracteristicas: string;
  imagen: File | null;
}