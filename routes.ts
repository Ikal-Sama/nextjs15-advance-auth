
/**
 * An array of routes that are accessible to the public
 * this routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * An array of routes that are used for authentication
 * this routes will redirect logged in user to '/settings'
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset-password",
    "/auth/new-password"
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";


/**
 * The default redirect route for logged in users
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";