import { login } from 'controllers/auth'
import { Router } from 'express'
import { validate } from 'middlewares/validate'
import { loginSchema } from 'zod/authValidation'

export default (router: Router) => {
    router.post('/api/auth/login', validate(loginSchema), login)
}
