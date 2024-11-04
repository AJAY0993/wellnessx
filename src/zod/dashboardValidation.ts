import { z } from 'zod'

export const dashboardSchema = z.object({
    params: z.object({
        adminId: z.string().nonempty({ message: 'Admin ID is required' }),
    }),
})

export type DashboardSchema = z.infer<typeof dashboardSchema>
