import { Response, NextFunction } from 'express'
import Role from '../types/role'
import MyRequest from '../types/myreq'
import { verifyToken } from 'utils/jwt'
import User from 'types/user'

export const isAuthenticated = (
    req: MyRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' })
    } else {
        const decode = verifyToken(token || '')
        if (decode) {
            req.user = decode as User
            req.user = decode as User
            next()
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    }
}

export const isAuthorized = (...roles: Role[]) => {
    return (req: MyRequest, res: Response, next: NextFunction): void => {
        if (req.user?.role !== undefined && roles.includes(req.user.role)) {
            next()
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    }
}
