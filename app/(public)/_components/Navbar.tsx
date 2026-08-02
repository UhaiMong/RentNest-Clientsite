import { logoutAction } from "@/app/(auth)/_actions/authActions";
import { PublicNavbar } from "@/components/shared/navbar";
import { dashboardPathForRole, getCurrentUser } from "@/lib/session";

export default async function Navbar() {
  const user = await getCurrentUser();
  const dashboardHref = user ? dashboardPathForRole(user.role) : null;
  return (
    <PublicNavbar
      user={user}
      logoutAction={logoutAction}
      dashboardHref={dashboardHref}
    />
  );
}
