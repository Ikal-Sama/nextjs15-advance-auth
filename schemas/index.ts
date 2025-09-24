import { UserRole } from '@prisma/client'
import * as z from 'zod'

/**
 * This is a list of schema to validate the fields that user
 * inputs in the browser
 */

export const LoginSchema = z.object({
    email: z.email("Email is required"),
    password: z.string().min(1, "Password is required")
})

export const RegisterSchema = z.object({
    email: z.email("Email is required"),
    password: z.string().min(6, "Minimum 6 characters required"),
    name: z.string().min(1, "Name is required")
})

export const ResetSchema = z.object({
    email: z.email("Email is required"),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, "Minimum 6 characters required"),
})

export const UpdateUserSchema = z.object({
    name: z.optional(z.string()),
    email:z.optional(z.email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
}).refine((data) => {
    if(data.password && !data.newPassword) {
        return false
    }
    return true
}, {
    message: "New password is required!",
    path: ["newPassword"]
}).refine((data) => {
    if(data.newPassword && !data.password) {
        return false
    }
    return true
}, {
    message: "Password is required!",
    path: ["password"]
})
   
