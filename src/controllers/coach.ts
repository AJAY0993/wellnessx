import { Request, Response } from 'express'
import User from 'models/user'
import bcrypt from 'bcrypt'

export const createCoach = async (req: Request, res: Response) => {
    try {
        const { name, email, password, specialization } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const newCoach = await User.create({
            name,
            email,
            specialization,
            role: 'coach',
            password: hashedPassword,
        })

        res.status(201).json({
            message: 'Coach created successfully',
            coach: newCoach,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating coach' })
    }
}
