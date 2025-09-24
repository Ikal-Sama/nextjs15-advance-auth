"use server"

import { prisma } from "@/lib/db"
import { UpdateUserSchema } from "@/schemas"
import * as z from "zod"
import { currentUser } from "@/lib/auth"
import { getUserByEmail, getUserById } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/services/nodemailer"
import bcrypt from "bcryptjs"


/**
 * Updates the authenticated user's profile information
 * Handles updates to name, email, password, and role based on the provided values
 * Restricts email and password updates for OAuth-authenticated users
 * @param values - The user data to update, validated against UpdateUserSchema
 * @returns An object with success/error message
 * @throws Error if the user is not authenticated or authorized
 */

export const updateUser = async (values: z.infer<typeof UpdateUserSchema>) => {
    const user = await currentUser()
    if(!user) {
        return {error: "Unauthorized"}
    }

    const dbUser = await getUserById(user.id!)

    if(!dbUser) {
        return {error: "Unauthorized"}
    }

    // you can't update the email and password if you are using OAuth
    if(user.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
    }

    if(values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if(existingUser && existingUser.id !== user.id) {
            return {error:"Email already in used"}
        }

        const verificationToken = await generateVerificationToken(
            values.email
        )
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return {success: "Verification email sent!"}
    }

    if(values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password);
        if(!passwordMatch) {
            return {error: "Inccorect password!"}
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);

        values.password = hashedPassword;
        values.newPassword = undefined; 
    }

    // Update user data
    await prisma.user.update({
        where: {id: dbUser.id},
        data:{
            ...values
        }
    });

    return {success: "User updated successfully"}

}