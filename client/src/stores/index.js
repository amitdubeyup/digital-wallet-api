import jwt_decode from "jwt-decode";
import { defineStore } from 'pinia';
import { router } from '@/router';

export const Store = defineStore({
    id: 'auth',
    state: () => ({
        have_prev: false,
        have_next: false,
        limit: 10,
        skip: 0,
        filter: "",
        apply_filter: {
            date: true,
            amount: true,
            balance: true,
        },
        transactions: [],
        balance: 0,
        token: localStorage.getItem('token') ?? null,
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
                    const decoded = jwt_decode(result.data?.token);
                    localStorage.setItem('token', result.data?.token);
                    localStorage.setItem('user', JSON.stringify(decoded?.data));
                    this.token = result.data?.token;
                    this.user = decoded?.data;
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
        },
        async walletBalance() {
            try {
                const headers = {
                    headers: {
                        'Content-Type': 'application/json',
                        token: this.token
                    }
                };
                const result = await this.$axios.get(`${this.$base_url}/wallet/balance/${this.user._id}`, headers);
                if (result.data?.success) {
                    this.balance = parseFloat(result.data?.data?.balance ?? '0').toFixed(4);
                } else {
                    this.$toast.error(result.data?.message);
                }
            } catch (error) {
                this.$toast.error(error?.message ?? error ?? "Unable to process your request.");
            }
        },
        async fetchTransactions() {
            try {
                const headers = {
                    headers: {
                        'Content-Type': 'application/json',
                        token: this.token
                    }
                };
                const result = await this.$axios.get(`${this.$base_url}/wallet/transactions/${this.user._id}?skip=${this.skip}&limit=${this.limit}${this.filter}`, headers);
                if (result.data?.success) {
                    this.have_prev = result?.data?.data?.have_prev ?? false;
                    this.have_next = result?.data?.data?.have_next ?? false;
                    this.transactions = result?.data?.data?.transactions ?? [];
                } else {
                    this.$toast.error(result.data?.message);
                }
            } catch (error) {
                this.$toast.error(error?.message ?? error ?? "Unable to process your request.");
            }
        },
        async createTransaction(body) {
            if (body?.amount && body?.description && body?.type) {
                try {
                    const headers = {
                        headers: {
                            'Content-Type': 'application/json',
                            token: this.token
                        }
                    };
                    const result = await this.$axios.post(`${this.$base_url}/wallet/transaction/${this.user._id}`, body, headers);
                    if (result.data?.success) {
                        this.walletBalance();
                        this.fetchTransactions();
                        this.$toast.success(result.data?.message);
                    } else {
                        this.$toast.error(result.data?.message);
                    }
                } catch (error) {
                    this.$toast.error(error?.message ?? error ?? "Unable to process your request.");
                }
            } else {
                let message = "Please fill form data correctly.";
                if (!body?.amount) message = "Amount is required.";
                if (!body?.description) message = "Description is required.";
                if (!body?.type) message = "Transaction type is required.";
                this.$toast.error(message);
            }
        },
        prev() {
            this.skip = this.skip - 1;
            if (this.skip <= 0) this.skip = 0;
            this.fetchTransactions();
        },
        next() {
            this.skip = this.skip + 1;
            if (this.skip <= 0) this.skip = 0;
            this.fetchTransactions();
        },
        dateFilter() {
            this.apply_filter.date = !this.apply_filter.date;
            if (this.apply_filter.date) {
                this.filter = `&created_at=-1`;
            } else {
                this.filter = `&created_at=1`;
            }
            this.fetchTransactions();
        },
        amountFilter() {
            this.apply_filter.amount = !this.apply_filter.amount;
            if (this.apply_filter.amount) {
                this.filter = `&amount=-1`;
            } else {
                this.filter = `&amount=1`;
            }
            this.fetchTransactions();
        },
        balanceFilter() {
            this.apply_filter.balance = !this.apply_filter.balance;
            if (this.apply_filter.balance) {
                this.filter = `&balance=-1`;
            } else {
                this.filter = `&balance=1`;
            }
            this.fetchTransactions();
        },
    }
});
