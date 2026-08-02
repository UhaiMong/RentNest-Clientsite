import { getAllUsers, deleteUserAction } from "../_actions/adminActions";
import { Button } from "@/components/ui/button";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Users</h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Joined</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <form action={deleteUserAction.bind(null, u.id)}>
                    <Button type="submit" size="sm" variant="destructive">
                      Remove
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
