import {z} from "zod"

export const signUpSchema = z.object({
    email: z.email().min(1, "Email is required"),
    password: z.string().min(8, "Password needs to be at least 8 characters"),
    fullName: z.string().min(1, "Full name is required"),
})

export type SignUpData = z.infer<typeof signUpSchema>
