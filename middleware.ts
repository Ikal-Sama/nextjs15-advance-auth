import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT
}from '@/routes'

/**
 * Authentication middleware configuration
 * This middleware handles route protection and redirections based on authentication state
 * It uses NextAuth.js for authentication and protects routes based on the user's login status
 */
const { auth } = NextAuth(authConfig)

/**
 * Main authentication middleware function
 * This function runs on every request and enforces authentication rules
 * @param req - The incoming request object
 * @returns Response or null based on authentication status and route rules
 */
export default auth((req) => {
  
    const {nextUrl} = req;
    // Check if user is authenticated
    const isLoggedIn = !!req.auth;

    // Determine the type of route being accessed
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // Allow API auth routes to be accessed without redirection
    if(isApiAuthRoute){
        return null;
    }

    // Handle authentication routes (login, register, etc.)
    if(isAuthRoute){
        // If user is already logged in and tries to access auth route, redirect to home
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        // Otherwise, allow the request to proceed to the auth page
        return null
    }

    // Protect non-public routes by redirecting to login if not authenticated
    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL('/auth/login', nextUrl));
    }
    
    return null;
})

/**
 * Middleware configuration
 * Defines which paths should be processed by this middleware
 * Excludes Next.js internal paths and static files
 */
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ]
}