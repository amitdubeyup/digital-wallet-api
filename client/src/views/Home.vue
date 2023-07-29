<script setup>
import { storeToRefs } from 'pinia';
import { Store } from '@/stores';
const authStore = Store();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
        <h1>Hi {{ user.name }}!</h1>
        <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
    </div>
</template>