"use client";

import { signOutAndRedirect } from "@/actions/sign-out";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();

  const onClick = () => {
    signOutAndRedirect();
  };
  return (
    <div className="p-10 rounded-xl bg-white w-[600px]">
      <h1 className="text-xl font-medium">Welcome, {user?.name}</h1>
      <p className="text-muted-foreground">A simple authentication system</p>
    </div>
  );
}
