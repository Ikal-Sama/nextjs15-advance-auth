"use server"
import * as z from 'zod'

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from '@/lib/services/nodemailer'
import { generatePasswordResetToken } from '@/lib/tokens'

/**
 * Handles password reset request
 * Validates email, checks if user exists, generates reset token, and sends reset email
 * @param values - The reset form values containing the user's email
 * @returns An object with success/error message
 */
export const reset = async(values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid email!"}
    }

    const {email} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser) {
        return {error: "Email not found!"}
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return {success: "Reset email sent!"}
}