import { getCategories } from "@/app/services/property-action";
import { notFound } from "next/navigation";
import { updateCategoryAction } from "../../_actions/categoryActions";
import CategoryForm from "../_component/CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.id === id);

  if (!category) notFound();

  const action = updateCategoryAction.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Category</h1>
      <CategoryForm
        action={action}
        defaultValues={{
          propertyType: category.propertyType,
          usageType: category.usageType,
        }}
        submitLabel="Update Category"
      />
    </div>
  );
}
