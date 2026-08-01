import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RegistrationForm } from "@/app/(auth)/_components/RegistrationForm";
import AuthMotionWrapper from "../_components/AuthMotionWrapper";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <AuthMotionWrapper>
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Create an Account
              </CardTitle>
              <CardDescription className="text-center">
                Join RentNest as a Tenant or Landlord
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegistrationForm />
            </CardContent>
          </Card>
        </div>
      </AuthMotionWrapper>
    </div>
  );
}
