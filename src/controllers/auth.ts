import { Request, Response } from 'express'
import { generateToken } from '../utils/jwt'
import User from 'models/user'
import bcrypt from 'bcrypt'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            email,
        })

        if (!user) {
            res.status(401).json({
                message: 'Incorrect email or password',
            })
        } else {
            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            )
            if (!isPasswordCorrect) {
                res.status(401).json({
                    message: 'Incorrect email or password',
                })
            } else {
                const token = generateToken(user.id, user.email, user.role)

                res.cookie('jwt', token).status(200).json({ token })
            }
        }
    } catch {
        res.status(500).json({ message: 'Error logging in' })
    }
}
