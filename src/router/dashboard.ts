import { getAdminDashboard } from 'controllers/dashboard'
import { Router } from 'express'
import { isAuthenticated, isAuthorized } from 'middlewares/auth'

export default (router: Router) => {
    // GET /api/admin/dashboard - Admin dashboard
    router.get('/api/admin/dashboard', isAuthenticated, isAuthorized('admin'), getAdminDashboard)
}
