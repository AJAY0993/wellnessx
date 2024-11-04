import {
    createClient,
    deleteClient,
    scheduleSession,
    updateClientProgress,
} from 'controllers/client'
import { NextFunction, Router } from 'express'
import { isAuthenticated, isAuthorized } from 'middlewares/auth'
import { validate } from 'middlewares/validate'
import MyRequest from 'types/myreq'
import {
    createClientSchema,
    scheduleSessionSchema,
    updateProgressSchema,
} from 'zod/clientValidation'

export default (router: Router) => {
    // POST /api/clients - Create new client
    router.post(
        '/api/clients/',
        isAuthenticated,
        isAuthorized('admin', 'coach'),
        validate(createClientSchema),
        (req: MyRequest, res, next: NextFunction) => {
            if (req.user?.role === 'coach') {
                req.body.coachId = req.user.id
            }
            next()
        },
        createClient
    )

    // PATCH /api/clients/:id/progress - Update client progress
    router.patch(
        '/api/clients/:id/progress',
        isAuthenticated,
        isAuthorized('coach'),
        validate(updateProgressSchema),
        updateClientProgress
    )

    // DELETE /api/clients/:id - Delete a client
    router.delete(
        '/api/clients/:id',
        isAuthenticated,
        isAuthorized('admin'),
        deleteClient
    )

    // POST /api/clients/:id/schedule - Schedule follow-up session for client
    router.post(
        '/api/clients/:id/schedule',
        isAuthenticated,
        validate(scheduleSessionSchema),
        scheduleSession
    )
}
