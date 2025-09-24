'use server';

import { signOut } from "@/auth";
import { authRoutes } from "@/routes";

/**
 * Handles user sign out and redirects to the login page
 * Ends the current user session and redirects to the first auth route (login)
 * @returns A promise that resolves when the sign out is complete
 */
export const signOutAndRedirect = async () => {
  await signOut({ redirectTo: authRoutes[0] }); // Redirect to the first auth route (login)
};
