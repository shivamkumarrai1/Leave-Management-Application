<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="form.email" type="email" required class="w-full p-2 border rounded">
        </div>
        <div>
          <label class="block text-sm font-medium">Password</label>
          <input v-model="form.password" type="password" required class="w-full p-2 border rounded">
        </div>
        <button type="submit" :disabled="loading" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <p class="text-center mt-4 text-sm">
        New here? <router-link to="/register" class="text-blue-500">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const loading = ref(false);
const form = ref({ email: '', password: '' });

const handleLogin = async () => {
  loading.value = true;
  try {
    const res = await api.post('/auth/login', form.value);
    
    // FIX: Convert role to lowercase before saving
    const role = res.data.user.role.toLowerCase();
    const name = res.data.user.name;

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', role);
    localStorage.setItem('userName', name);

    if (role === 'employer') {
      router.push('/employer-dashboard');
    } else {
      router.push('/employee-dashboard');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  } finally {
    loading.value = false;
  }
};
</script>