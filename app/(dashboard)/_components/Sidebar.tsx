import { logoutAction } from "@/app/(auth)/_actions/authActions";
import { SidebarAction } from "@/components/shared/sidebarAction";
import { getCurrentUser } from "@/lib/session";

export default async function LogoutDashboard() {
  const user = await getCurrentUser();
  return <SidebarAction user={user} logoutAction={logoutAction} />;
}
