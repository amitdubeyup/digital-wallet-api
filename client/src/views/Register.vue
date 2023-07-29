<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { Store } from '@/stores';
const store = Store();

if (store.user) {
    router.push('/home');
}

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    mobile: Yup.string().required('Mobile is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

async function onSubmit(values) {
    await store.register(values);
}
</script>

<template>
    <div class="form">
        <h3 class="text-center">Wallet App</h3><br />
        <div class="card">
            <h5 class="card-header">Register</h5>
            <div class="card-body">
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" autocomplete="off">
                    <div class="form-group">
                        <label>Name</label>
                        <Field name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" />
                        <div class="invalid-feedback">{{ errors.name }}</div>
                    </div>
                    <div class="form-group">
                        <br />
                        <label>Email</label>
                        <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
                        <div class="invalid-feedback">{{ errors.email }}</div>
                    </div>
                    <div class="form-group">
                        <br />
                        <label>Mobile</label>
                        <Field name="mobile" type="text" class="form-control" :class="{ 'is-invalid': errors.mobile }" />
                        <div class="invalid-feedback">{{ errors.mobile }}</div>
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
                            Register
                        </button>
                        <router-link to="login" class="btn btn-link">Login</router-link>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>
