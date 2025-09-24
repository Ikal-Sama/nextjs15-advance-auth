"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/services/nodemailer";

/**
 * Handles user registration with email and password
 * Validates input, checks for existing user, hashes password, creates user, and sends verification email
 * @param values - The registration form values containing name, email, and password
 * @returns An object with success/error message
 */
export const register = async(values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    const {email, password, name} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if(existingUser) {
        return {error: "Email already in use."}
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )
    

    return {success: "Confirmation email sent"}
}