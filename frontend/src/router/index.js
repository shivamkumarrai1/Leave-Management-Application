import { createRouter, createWebHistory } from 'vue-router'

// Route Definitions
const routes = [{
        path: '/',
        name: 'Home',
        // Redirect logic: if logged in, go to dashboard; else, go to login
        redirect: () => {
            const token = localStorage.getItem('token')
            const role = localStorage.getItem('role')
            if (token && role === 'Employer') return '/employer-dashboard'
            if (token && role === 'Employee') return '/employee-dashboard'
            return '/login'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../pages/Login.vue')
    },
    {
        path: '/auth/signup', // Updated as requested
        name: 'Signup',
        component: () =>
            import ('../pages/Signup.vue')
    },
    {
        path: '/employee-dashboard',
        name: 'EmployeeDashboard',
        component: () =>
            import ('../pages/EmployeeDashboard.vue'),
        meta: { requiresAuth: true, role: 'Employee' }
    },
    {
        path: '/employer-dashboard',
        name: 'EmployerDashboard',
        component: () =>
            import ('../pages/EmployerDashboard.vue'),
        meta: { requiresAuth: true, role: 'Employer' }
    },
    // Fallback for 404
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation Guard (RBAC & Auth)
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('role')

    // 1. If route requires auth and no token is present
    if (to.meta.requiresAuth && !token) {
        return next('/login')
    }

    // 2. If user is logged in and trying to access login/signup
    if (token && (to.path === '/login' || to.path === '/auth/signup')) {
        return next(userRole === 'Employer' ? '/employer-dashboard' : '/employee-dashboard')
    }

    // 3. Role-based access control (RBAC)
    if (to.meta.role && to.meta.role !== userRole) {
        return next('/') // Redirect to default based on their actual role
    }

    next()
})

export default router