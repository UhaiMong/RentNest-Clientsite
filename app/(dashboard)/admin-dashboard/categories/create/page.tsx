import { createCategoryAction } from "../../_actions/categoryActions";
import CategoryForm from "../_component/CategoryForm";

export default function CreateCategoryPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add Category</h1>
      <CategoryForm
        action={createCategoryAction}
        submitLabel="Create Category"
      />
    </div>
  );
}
