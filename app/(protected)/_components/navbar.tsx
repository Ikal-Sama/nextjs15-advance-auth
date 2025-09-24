"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Home, Settings2, User2, UserLock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm ">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/home" ? "default" : "outline"}>
          <Link href="/home">
            <Home className="size-4" />
            Home
          </Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/profile" ? "default" : "outline"}
        >
          <Link href="/profile">
            <User2 className="size-4" />
            Profile
          </Link>
        </Button>

        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">
            <UserLock className="size-4" />
            Admin
          </Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">
            <Settings2 className="size-4" /> Settings
          </Link>
        </Button>
      </div>
      <UserButton />
    </div>
  );
};
