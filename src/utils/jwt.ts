import jwt from 'jsonwebtoken'
import Role from '../types/role'
import User from 'types/user'

export const generateToken = (
    id: string,
    email: string,
    role: Role
): string => {
    const user: User = { id, email, role }
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}
