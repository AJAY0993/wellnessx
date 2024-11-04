import { Request } from 'express'
import User from './user'

interface MyRequest extends Request {
    user?: User
}

export default MyRequest
