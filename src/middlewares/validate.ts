import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodSchema } from 'zod'

export const validate =
    (schema: ZodSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ message: error.issues[0].message })
            } else {
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }
