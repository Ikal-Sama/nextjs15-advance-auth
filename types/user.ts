import { UserRole } from "@prisma/client";

export type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  role: UserRole;
  isOAuth: boolean;
  isTwoFactorEnabled?: boolean;
}

