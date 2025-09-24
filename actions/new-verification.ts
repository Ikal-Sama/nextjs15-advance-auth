"use server";

import {prisma} from '@/lib/db'
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

/**
 * Handles email verification using a verification token
 * Validates the token, checks for expiration, verifies the user's email, and cleans up the token
 * @param token - The verification token from the email link
 * @returns An object with success/error message
 */
export const newVerification = async(token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken) {
        return {error: "Token does not exists!"}
    }
    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) {
        return {error: "Token has expired!"}
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if(!existingUser) {
        return {error: "Email does not exist!"}
    }

    await prisma.user.update({
        where: {id: existingUser.id},
        data:{
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await prisma.verificationToken.delete({
        where: {id: existingToken.id}
    });

    return {success: "Email Verified!"}
}