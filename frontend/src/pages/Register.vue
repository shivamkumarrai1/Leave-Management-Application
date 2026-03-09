<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Create Account</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Full Name</label>
          <input v-model="form.name" type="text" required class="w-full p-2 border rounded" placeholder="John Doe">
        </div>
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="form.email" type="email" required class="w-full p-2 border rounded" placeholder="email@example.com">
        </div>
        <div>
          <label class="block text-sm font-medium">Password</label>
          <input v-model="form.password" type="password" required class="w-full p-2 border rounded" placeholder="••••••••">
        </div>
        <div>
          <label class="block text-sm font-medium">I am an...</label>
          <select v-model="form.role" required class="w-full p-2 border rounded">
            <option value="" disabled>Select Role</option>
            <option value="employee">Employee</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <button type="submit" :disabled="loading" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {{ loading ? 'Processing...' : 'Register' }}
        </button>
      </form>
      <p class="text-center mt-4 text-sm">
        Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link>
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
const form = ref({ name: '', email: '', password: '', role: '' });

const handleRegister = async () => {
  loading.value = true;
  try {
    await api.post('/auth/signup', form.value);
    alert('Registration successful! Please login.');
    router.push('/login');
  } catch (err) {
    alert(err.response?.data?.message || 'Registration failed');
  } finally {
    loading.value = false;
  }
};
</script>