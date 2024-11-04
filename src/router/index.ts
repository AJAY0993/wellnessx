import { Router } from 'express'
import auth from './auth'
import client from './client'
import coach from './coach'
import dashboard from './dashboard'

const router = Router()

export default (): Router => {
    auth(router)
    client(router)
    coach(router)
    dashboard(router)
    return router
}
