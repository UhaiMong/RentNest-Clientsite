import { getAllProperties } from "../_actions/adminActions";

export default async function AdminPropertiesPage() {
  const properties = await getAllProperties();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">All Properties</h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Landlord</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.landlord?.name ?? "—"}</td>
                <td className="p-3">{p.location}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">
                  <span
                    className={
                      p.isAvailable ? "text-green-600" : "text-red-600"
                    }
                  >
                    {p.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
