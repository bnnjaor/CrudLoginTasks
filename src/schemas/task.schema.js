import {z} from 'zod'

export const createTaskSchema = z.object({
    title: z.string({
        required_error: "Ttile is required"
    }),
    description: z.string({
        required_error: "Description is required"
    }),
    date: z.string().datetime().optional()
})