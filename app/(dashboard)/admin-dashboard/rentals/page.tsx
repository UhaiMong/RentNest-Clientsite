import { getAllRentals } from "../_actions/adminActions";
import { format, parseISO } from "date-fns";

export default async function AdminRentalsPage() {
  const rentals = await getAllRentals();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">All Rentals</h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Property</th>
              <th className="p-3 text-left">Tenant</th>
              <th className="p-3 text-left">Move in</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.property.title}</td>
                <td className="p-3">{r.tenant?.name ?? "—"}</td>
                <td className="p-3">
                  {format(parseISO(r.moveInDate), "dd-MM-yyyy")}
                </td>
                <td className="p-3">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
