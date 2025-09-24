import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../features/products/productsSlice";
import { useState } from "react";

function Row({ product, index, onEdit, onDelete }) {
  return (
    <tr className="border-t">
      <td className="p-2 text-sm text-gray-700">{index + 1}</td>
      <td className="p-2 text-sm">
        <span className="font-medium">{product.name}</span>
      </td>
      <td className="p-2 text-sm">{product.category}</td>
      <td className="p-2 text-sm">{product.expiryDate}</td>
      <td className="p-2 text-sm">${product.cost}</td>
      <td className="p-2 text-sm flex gap-2">
        <button
          className="px-2 py-1 rounded bg-blue-500 text-white"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 rounded bg-red-500 text-white"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function ProductTable() {
  const items = useSelector((s) => s.products.items);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValues, setEditValues] = useState({
    name: "",
    category: "",
    expiryDate: "",
    cost: "",
  });
  const dispatch = useDispatch();

  const filtered = items.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  });

  const startEdit = (p) => {
    setEditing(p.id);
    setEditValues({
      name: p.name,
      category: p.category,
      expiryDate: p.expiryDate,
      cost: p.cost,
    });
  };

  const submitEdit = () => {
    dispatch(
      updateProduct({
        id: editing,
        changes: { ...editValues, cost: Number(editValues.cost) || 0 },
      })
    );
    setEditing(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Products</h2>
      <div className="flex items-center justify-between mb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search product by name or category"
          className="w-full sm:w-1/2 border rounded px-3 py-2 text-sm"
        />
        <div className="text-xs text-gray-500 ml-3">
          {items.length} products
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-left text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-sm font-semibold w-14">No.</th>
              <th className="p-2 text-sm font-semibold">Name</th>
              <th className="p-2 text-sm font-semibold">Category</th>
              <th className="p-2 text-sm font-semibold">Expiry date</th>
              <th className="p-2 text-sm font-semibold">Cost</th>
              <th className="p-2 text-sm font-semibold w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) =>
              editing === p.id ? (
                <tr key={p.id} className="border-t bg-yellow-50">
                  <td className="p-2 text-sm">{idx + 1}</td>
                  <td className="p-2 text-sm">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editValues.name}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, name: e.target.value }))
                      }
                    />
                  </td>
                  <td className="p-2 text-sm">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editValues.category}
                      onChange={(e) =>
                        setEditValues((v) => ({
                          ...v,
                          category: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td className="p-2 text-sm">
                    <input
                      type="date"
                      className="border rounded px-2 py-1 w-full"
                      value={editValues.expiryDate}
                      onChange={(e) =>
                        setEditValues((v) => ({
                          ...v,
                          expiryDate: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td className="p-2 text-sm">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editValues.cost}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, cost: e.target.value }))
                      }
                    />
                  </td>
                  <td className="p-2 text-sm flex gap-2">
                    <button
                      className="px-2 py-1 rounded bg-green-600 text-white"
                      onClick={submitEdit}
                    >
                      Save
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-gray-400 text-white"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <Row
                  key={p.id}
                  product={p}
                  index={idx}
                  onEdit={startEdit}
                  onDelete={(id) => dispatch(deleteProduct(id))}
                />
              )
            )}
            {filtered.length === 0 && (
              <tr>
                <td
                  className="p-4 text-center text-sm text-gray-500"
                  colSpan="6"
                >
                  No products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
