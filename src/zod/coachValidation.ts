import { z } from 'zod'

export const createCoachSchema = z.object({
    body: z.object({
        name: z
            .string({ required_error: 'Name is required' })
            .min(1, { message: 'Name is required' }),
        email: z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email address' }),
        password: z
            .string({ required_error: 'password is required' })
            .min(6, { message: 'Password must be at least 6 characters' }),
        specialization: z
            .string({ required_error: 'specialization is required' })
            .min(1, { message: 'Specialization is required' }),
    }),
})

export type CreateCoachSchema = z.infer<typeof createCoachSchema>
