import { createRouter, createWebHistory } from 'vue-router';
import { Store } from '@/stores';
import { Home, Login, Register } from '@/views';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: Login },
        { path: '', component: Login },
        { path: '/home', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

router.beforeEach(async (to) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = Store();
    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/login';
    }
});
