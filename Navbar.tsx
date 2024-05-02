import { UserIcon, ShoppingCartIcon, MagnifyingGlassIcon, ComputerDesktopIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <header className="container mx-auto px-4 py-2">
      <div className="flex flex-col md:flex-row items-center justify-around w-full">
        {/* Ícono de la Empresa y Menú para móviles */}
        <button className="flex items-center space-x-2 w-full md:w-1/6 justify-between md:justify-start">
          <ComputerDesktopIcon className="h-8 w-8 text-purple-950"/>
          <h1 className="hidden text-xl md:block font-black uppercase text-purple-950">conectortec</h1>
        </button>
        
        {/* Barra de Búsqueda */}
        <div className="flex w-full md:w-4/6 items-center border-2 rounded-xl overflow-hidden relative">
          <input 
            type="text" 
            className="pl-4 pr-10 py-2 w-full focus:outline-none"
            placeholder="Buscar..." 
          />
          <button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <MagnifyingGlassIcon className="w-6 h-6"/>
          </button>
        </div>
        
        {/* Iconos de Usuario y Carrito */}
        <div className="flex items-center space-x-4 w-full md:w-1/6 justify-center gap-5">
          <button className="hidden md:block">
            <UserIcon className="w-8 h-8"/>
          </button>
          <button>
            <ShoppingCartIcon className="w-8 h-8"/>
          </button>
        </div>
      </div>
    </header>
  );
}
