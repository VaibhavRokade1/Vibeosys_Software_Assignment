import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

export default function AddPage() {
  return (
    <div className="space-y-6">
      <ProductForm />
      <ProductTable />
    </div>
  );
}
