<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { storeToRefs } from 'pinia';
import { Store } from '@/stores';
const store = Store();
const { have_prev, have_next, transactions, balance, user } = storeToRefs(store);

const schema = Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
    description: Yup.string().required('Description is required')
});

async function onSubmit(values, actions) {
    await store.createTransaction(values);
    actions.resetForm();
}
store.walletBalance();
store.fetchTransactions();

</script>

<template>
    <div class="main" v-if="user">
        <div class="header">
            <div class="row">
                <div class="col-8">
                    <h5 class="header-heading">Welcome {{ user.name }}!</h5>
                </div>
                <div class="col-4 text-right">
                    <b-button variant="outline-primary" class="mr-2">
                        Balance: {{ balance }} ₹
                    </b-button>
                    <b-button variant="outline-danger" @click="store.logout()">
                        <b-icon-power></b-icon-power> Logout
                    </b-button>
                </div>
            </div>
        </div>
        <div class="content">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" ref="form" autocomplete="off">
                <div class="row">
                    <div class="col-2">
                        <div class="content-heading">Create Transaction</div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <Field name="amount" type="number" class="form-control" :class="{ 'is-invalid': errors.amount }" placeholder="Enter Amount" />
                            <div class="invalid-feedback">{{ errors.amount }}</div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <Field name="description" type="text" class="form-control" :class="{ 'is-invalid': errors.description }" placeholder="Enter Description" />
                            <div class="invalid-feedback">{{ errors.description }}</div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-success">
                                    <Field type="radio" name="type" value="credit" autocomplete="off" checked="true" /> Credit
                                </label>
                                <label class="btn btn-danger">
                                    <Field type="radio" name="type" value="debit" autocomplete="off" /> Debit
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-1">
                        <div class="form-group">
                            <button class="btn btn-primary" :disabled="isSubmitting">
                                <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        <div class="transactions">
            <table class="table">
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Balance</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <thead>
                    <tr v-for="(transaction, index) in transactions" :key="index">
                        <td>{{ index + 1 }}.</td>
                        <td>{{ (transaction?.amount)?.toFixed(4) }}</td>
                        <td class="text-capitalize">{{ transaction?.type }}</td>
                        <td>{{ (transaction?.balance)?.toFixed(4) }}</td>
                        <td>{{ transaction?.description }}</td>
                        <td>{{ new Date(transaction?.created_at).toLocaleString() }}</td>
                    </tr>
                </thead>
            </table>
            <div class="row">
                <div class="col-12 text-right">
                    <b-button variant="primary" class="mr-2" :disabled="!have_prev" @click="store.prev()">
                        Prev
                    </b-button>
                    <b-button variant="primary" :disabled="!have_next" @click="store.next()">
                        Next
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>