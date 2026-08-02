import { getCategories } from "@/app/services/property-action";
import PropertyForm from "./_component/PropertyForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropertyMotionWrapper from "./_component/PropertyMotionWrapper";

export default async function CreatePropertyPage() {
  const categories = await getCategories();
  console.log("categories:", categories);
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add Property</h1>
      <PropertyMotionWrapper>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Property post form
            </CardTitle>
            <CardDescription className="text-center">
              Please fill the form carefully to post your property
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PropertyForm categories={categories ?? ""} />
          </CardContent>
        </Card>
      </PropertyMotionWrapper>
    </div>
  );
}
