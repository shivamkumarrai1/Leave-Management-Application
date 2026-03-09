import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import EmployeeDashboard from '../pages/EmployeeDashboard.vue';
import EmployerDashboard from '../pages/EmployerDashboard.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
        path: '/employee-dashboard',
        component: EmployeeDashboard,
        meta: { requiresAuth: true, role: 'employee' }
    },
    {
        path: '/employer-dashboard',
        component: EmployerDashboard,
        meta: { requiresAuth: true, role: 'employer' }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    // FIX: Force lowercase for comparison
    const userRole = localStorage.getItem('role') ? localStorage.getItem('role').toLowerCase() : null;

    if (to.meta.requiresAuth && !token) {
        return next('/login');
    }

    if (to.meta.role) {
        if (to.meta.role !== userRole) {
            // Redirect to their own dashboard if they try to access the wrong one
            return next(userRole === 'employer' ? '/employer-dashboard' : '/employee-dashboard');
        }
    }

    next();
});

export default router;