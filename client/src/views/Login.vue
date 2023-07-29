<script setup>
import { router } from '@/router';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { Store } from '@/stores';
const store = Store();

if (store.user) {
    router.push('/home');
}

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
});

async function onSubmit(values) {
    await store.login(values);
}
</script>

<template>
    <div class="form">
        <h3 class="text-center">Wallet App</h3><br />
        <div class="card">
            <h5 class="card-header">Login</h5>
            <div class="card-body">
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" autocomplete="off">
                    <div class="form-group">
                        <label>Email</label>
                        <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
                        <div class="invalid-feedback">{{ errors.email }}</div>
                    </div>
                    <div class="form-group">
                        <br />
                        <label>Password</label>
                        <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{ errors.password }}</div>
                    </div>
                    <div class="form-group">
                        <br />
                        <button class="btn btn-primary" :disabled="isSubmitting">
                            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                            Login
                        </button>
                        <router-link to="register" class="btn btn-link">Register</router-link>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>
