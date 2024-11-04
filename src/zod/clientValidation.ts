import { z } from 'zod'

export const createClientSchema = z.object({
    body: z.object({
        name: z
            .string({ required_error: 'Name is required' })
            .min(1, { message: 'Name is required' }),
        email: z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email address' }),
        phone: z
            .string({ required_error: 'Phone is required' })
            .min(10)
            .max(15, {
                message: 'Phone number must be between 10-15 characters',
            }),
        age: z
            .number({ required_error: 'Age is required' })
            .min(0, { message: 'Age must be a positive number' }),
        goal: z
            .string({ required_error: 'Goal is required' })
            .min(1, { message: 'Goal is required' }),
        coachId: z
            .string({ required_error: 'Coach ID is required' })
            .nonempty({ message: 'Coach ID is required' }),
    }),
})

export const updateProgressSchema = z.object({
    body: z.object({
        progressNotes: z.string().optional(),
        lastUpdated: z.date().optional(),
        weight: z.number().optional(),
        bmi: z.number().optional(),
    }),
})

export const scheduleSessionSchema = z.object({
    body: z.object({
        date: z
            .string({ required_error: 'Date is required' })
            .refine((date) => !isNaN(Date.parse(date)), {
                message: 'Invalid date',
            }),
        time: z
            .string({ required_error: 'Time is required' })
            .min(5, { message: 'Time is required' }),
        sessionType: z.enum(['Consultation', 'Follow-up'], {
            message: 'Invalid session type',
        }),
    }),
})

export type CreateClientSchema = z.infer<typeof createClientSchema>
export type UpdateProgressSchema = z.infer<typeof updateProgressSchema>
export type ScheduleSessionSchema = z.infer<typeof scheduleSessionSchema>
