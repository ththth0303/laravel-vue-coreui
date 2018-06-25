import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '../containers/Full'

// Views
import Dashboard from '../views/Dashboard'
import Category from '../modules/category/views/AdminCategory'
import Login from '../views/login/Login'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            meta: { requiresAuth: true },
            component: Full,
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                },
                {
                    path: 'category',
                    name: 'Category',
                    component: Category,
                },

            ]
        },
        {
            path: '/login',
            name: 'Login',
            // meta: { requiresAuth: false },
            component: Login,
        }
    ]
});

router.beforeEach((to, from, next) => {
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const auth = JSON.parse(localStorage.getItem('token')) || {};
        
        if (!auth || !auth.access_token) {
            return next({ path: '/login' })
        }
    }

    return next();
})

export default router;
