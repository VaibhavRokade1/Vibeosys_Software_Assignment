import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productsSlice";
import { useState } from "react";

export default function ProductForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    category: "",
    expiryDate: "",
    cost: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.expiryDate) return;
    dispatch(addProduct(form));
    setForm({ name: "", category: "", expiryDate: "", cost: "" });
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add new product</h2>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
      >
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Name of product</label>
          <input
            className="border rounded px-3 py-2 text-sm"
            value={form.name}
            onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
            placeholder="Product name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Category</label>
          <input
            className="border rounded px-3 py-2 text-sm"
            value={form.category}
            onChange={(e) =>
              setForm((v) => ({ ...v, category: e.target.value }))
            }
            placeholder="Category"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Expiry date</label>
          <input
            type="date"
            min={today}
            className="border rounded px-3 py-2 text-sm"
            value={form.expiryDate}
            onChange={(e) =>
              setForm((v) => ({ ...v, expiryDate: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Product cost</label>
          <input
            className="border rounded px-3 py-2 text-sm"
            value={form.cost}
            inputMode="decimal"
            onChange={(e) =>
              setForm((v) => ({
                ...v,
                cost: e.target.value.replace(/[^0-9.]/g, ""),
              }))
            }
            placeholder="$ 0.00"
          />
        </div>
        <div className="sm:col-span-4 flex gap-2 mt-1">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={() =>
              setForm({ name: "", category: "", expiryDate: "", cost: "" })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
