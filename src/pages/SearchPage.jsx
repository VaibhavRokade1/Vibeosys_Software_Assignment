import { useState } from "react";
import { useSelector } from "react-redux";

export default function SearchPage() {
  const items = useSelector((s) => s.products.items);
  const [query, setQuery] = useState("");

  const filtered = items.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  });

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
          {filtered.length} results
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
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <tr key={p.id} className="border-t">
                <td className="p-2 text-sm text-gray-700">{idx + 1}</td>
                <td className="p-2 text-sm">
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="p-2 text-sm">{p.category}</td>
                <td className="p-2 text-sm">{p.expiryDate}</td>
                <td className="p-2 text-sm">${p.cost}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  className="p-4 text-center text-sm text-gray-500"
                  colSpan="5"
                >
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
