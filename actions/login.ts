"use server";
import * as z from 'zod';
import { LoginSchema } from '@/schemas';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/services/nodemailer';


/**
 * Handles user login with email and password or OAuth
 * Validates credentials, checks email verification, and manages the login session
 * @param values - The login form values containing email and password
 * @returns An object with success/error message or redirects on success
 */
export const login = async(values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    const {email, password} = validatedFields.data

    const existingUser = await getUserByEmail(email)
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error: "User does not exist!"}
    }

    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return {success: "Confirmation email sent!"};
    }

    try {

        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })

         

    } catch (error) {
       if(error instanceof AuthError){
        switch(error.type){
            case "CredentialsSignin":
                return {error: "Invalid credentials"}
            default:
                return {error: "Something went wrong"}
        }
       }

       throw error;
    }
}


