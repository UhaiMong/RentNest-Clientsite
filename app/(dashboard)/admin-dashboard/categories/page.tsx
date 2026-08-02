import Link from "next/link";
import {
  getCategories,
  deleteCategoryAction,
} from "../_actions/categoryActions";
import { Button } from "@/components/ui/button";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Link href="/admin-dashboard/categories/create">
          <Button>Add Category</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Property Type</th>
              <th className="p-3 text-left">Usage Type</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.propertyType}</td>
                <td className="p-3">{c.usageType}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Link href={`/admin-dashboard/categories/${c.id}/edit`}>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </Link>
                    <form action={deleteCategoryAction.bind(null, c.id)}>
                      <Button type="submit" size="sm" variant="destructive">
                        Delete
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
