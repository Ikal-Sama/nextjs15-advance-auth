"use client";

import { signOutAndRedirect } from "@/actions/sign-out";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    signOutAndRedirect();
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
