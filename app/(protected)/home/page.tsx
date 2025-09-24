import { currentUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await currentUser();

  return (
    <div className="p-10 rounded-xl bg-white w-[600px]">
      <h1 className="text-xl font-medium">Welcome, {user?.name}</h1>
      <p className="text-muted-foreground">A simple authentication system</p>
    </div>
  );
}
