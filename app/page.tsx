import PublicLayout from "./(public)/layout";
import PublicHome from "./(public)/page";

export default function HomePage() {
  return (
    <main>
      <PublicLayout>
        <PublicHome />
      </PublicLayout>
    </main>
  );
}
