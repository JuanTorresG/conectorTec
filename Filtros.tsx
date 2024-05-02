export default function Filtros({ minPrice, setMinPrice, maxPrice, setMaxPrice }) {
    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>
            <div className="mb-4">
                <label htmlFor="minPrice" className="block text-sm font-semibold mb-1">Precio Mínimo:</label>
                <input
                    type="number"
                    id="minPrice"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="px-3 py-2 w-full border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="maxPrice" className="block text-sm font-semibold mb-1">Precio Máximo:</label>
                <input
                    type="number"
                    id="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="px-3 py-2 w-full border border-gray-300 rounded-md"
                />
            </div>
        </>
    );
}
