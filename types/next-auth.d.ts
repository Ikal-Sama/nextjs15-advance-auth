import { JWT } from "next-auth/jwt"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER",
      isOAuth: boolean 
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role: "ADMIN" | "USER",
    isOAuth: boolean 

  }
}
