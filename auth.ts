import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from '@/auth.config'
import { prisma } from '@/lib/db'
import { getUserById } from "./data/user"
import { getAccountByUserId } from "./data/account"

/**
 * NextAuth configuration with Prisma adapter and custom callbacks
 * This file sets up the authentication configuration for the application
 * including session management, JWT handling, and authentication callbacks
 */

/**
 * NextAuth configuration object with custom settings and handlers
 * @returns Authentication handlers and functions for the application
 */
export const {
    handlers,
    signIn, 
    signOut, 
    auth 
} = NextAuth({
  /**
   * Custom page paths for authentication flows
   */
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  /**
   * Authentication event handlers
   */
  events: {
    /**
     * Automatically verify email when user links an OAuth account
     * This is useful for social logins that don't require email verification
     */
    async linkAccount({user}) {
      await prisma.user.update({
        where: {id: user.id},
        data: {
          emailVerified: new Date(),
        }
      })
    }
  },
  /**
   * Authentication callbacks for customizing the authentication flow
   */
  callbacks: {
    /**
     * Controls if a user is allowed to sign in
     * @param user - The user object from the authentication provider
     * @param account - The account details from the provider
     * @returns boolean indicating if sign in is allowed
     */
    async signIn({user, account}) {
      
      // Allow OAuth without email verification
      if(account?.provider !== "credentials") return true;
      
      const existingUser = await getUserById(user.id!);

      // Prevent sign in without email verification
      if(!existingUser?.emailVerified) {
        return false;
      }


      return true;
    },
    /**
     * Customizes the session object returned to the client
     * @param session - The current session object
     * @param token - The JWT token containing user data
     * @returns The modified session object
     */
    async session({token, session}) {
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(token.role && session.user) {
        session.user.role = token.role
      }

      if(session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth
      }

      return session;
    },

    /**
     * Customizes the JWT token that will be stored in the session cookie
     * @param token - The current JWT token
     * @returns The modified JWT token with additional user data
     */
    async jwt({token}) {
      
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;

      const existingAccount = await getAccountByUserId(
        existingUser.id
      )

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role

      return token; 
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})