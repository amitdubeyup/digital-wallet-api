import { defineStore } from 'pinia';
import { router } from '@/router';

export const Store = defineStore({
    id: 'auth',
    state: () => ({
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    }),
    actions: {
        async login(body) {
            try {
                const headers = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const result = await this.$axios.post(`${this.$base_url}/user/login`, body, headers);
                if (result.data?.success) {
                    this.user = result.data?.data;
                    localStorage.setItem('token', result.data?.token);
                    localStorage.setItem('user', JSON.stringify(result.data?.data));
                    this.$toast.success(result.data?.message);
                    router.push('/home');
                } else {
                    this.$toast.error(result.data?.message);
                }
            } catch (error) {
                this.$toast.error(error?.message ?? error ?? "Unable to process your request.");
            }
        },
        async register(body) {
            try {
                const headers = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const result = await this.$axios.post(`${this.$base_url}/user/register`, body, headers);
                if (result.data?.success) {
                    this.$toast.success(result.data?.message);
                    router.push('/login');
                } else {
                    this.$toast.error(result.data?.message);
                }
            } catch (error) {
                this.$toast.error(error?.message ?? error ?? "Unable to process your request.");
            }
        },
        logout() {
            this.user = null;
            localStorage.clear();
            router.push('/login');
        }
    }
});
