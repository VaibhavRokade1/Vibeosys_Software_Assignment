import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/products/productsSlice";

export default function ProductCards() {
  const items = useSelector((s) => s.products.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add product to cart</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="border rounded-2xl p-4 shadow-sm">
            <div className="font-semibold mb-1">{p.name}</div>
            <span className="inline-block text-xs bg-amber-200 text-amber-800 rounded-full px-2 py-0.5 mb-3">
              {p.category}
            </span>
            <div className="text-gray-700 font-medium mb-3">${p.cost}</div>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => dispatch(addToCart())}
            >
              Add 🛒
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-sm text-gray-500">
            No products yet. Add some first.
          </div>
        )}
      </div>
    </div>
  );
}
