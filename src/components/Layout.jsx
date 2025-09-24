import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export default function Layout({ children }) {
  // Show dynamic product count in the header badge
  const productCount = useSelector((s) => s.products.items.length);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg border border-gray-200">
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b">
          <Link
            to="/"
            className="font-semibold tracking-wide border px-3 py-1 rounded"
          >
            LOGO
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-600"
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-600"
                }`
              }
            >
              Add products
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-600"
                }`
              }
            >
              Search
            </NavLink>
            <div
              className="relative ml-2 text-gray-500"
              aria-label="products-count"
            >
              <span>🛒</span>
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                {productCount}
              </span>
            </div>
          </nav>
        </header>

        <main className="px-4 sm:px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
