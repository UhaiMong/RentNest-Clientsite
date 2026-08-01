import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../_components/LoginForm";
import AuthMotionWrapper from "../_components/AuthMotionWrapper";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <AuthMotionWrapper>
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Login account
              </CardTitle>
              <CardDescription className="text-center">
                Login as a Tenant or Landlord
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm redirectTo={redirect ?? ""} />
            </CardContent>
          </Card>
        </div>
      </AuthMotionWrapper>
    </div>
  );
}
