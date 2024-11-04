import { getClientsForCoach } from 'controllers/client'
import { createCoach } from 'controllers/coach'
import { Router } from 'express'
import { isAuthenticated, isAuthorized } from 'middlewares/auth'
import { validate } from 'middlewares/validate'
import { createCoachSchema } from 'zod/coachValidation'

export default (router: Router) => {
    // POST /api/coaches - Create new coach (admin only)
    router.post(
        '/api/coaches',
        isAuthenticated,
        isAuthorized('admin'),
        validate(createCoachSchema),
        createCoach
    )
    router.get(
        '/api/coaches/:coachId/clients',
        isAuthenticated,
        getClientsForCoach
    )
}
