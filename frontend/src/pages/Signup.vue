<template>
  <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
    <div class="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
      <div>
        <div class="flex justify-center">
          <div class="bg-blue-600 p-3 rounded-xl">
             <CalendarCheck class="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>
        
        <div class="space-y-4 rounded-md">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              v-model="form.name"
              id="name" 
              name="name" 
              type="text" 
              required 
              class="relative block w-full mt-1 border-gray-300 rounded-lg border-2 p-2 focus:border-blue-500 outline-none transition-all sm:text-sm" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input 
              v-model="form.email"
              id="email" 
              name="email" 
              type="email" 
              required 
              class="relative block w-full mt-1 border-gray-300 rounded-lg border-2 p-2 focus:border-blue-500 outline-none transition-all sm:text-sm" 
              placeholder="name@company.com" 
            />
          </div>
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
            <select 
              v-model="form.role"
              id="role"
              class="relative block w-full mt-1 border-gray-300 rounded-lg border-2 p-2 focus:border-blue-500 outline-none transition-all sm:text-sm bg-white"
            >
              <option value="employee">Employee</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input 
              v-model="form.password"
              id="password" 
              name="password" 
              type="password" 
              required 
              class="relative block w-full mt-1 border-gray-300 rounded-lg border-2 p-2 focus:border-blue-500 outline-none transition-all sm:text-sm" 
              placeholder="••••••••" 
            />
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="loading"
            class="group relative flex w-full justify-center rounded-lg bg-blue-600 py-3 px-4 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all shadow-lg shadow-blue-200"
          >
            <span v-if="loading">Creating account...</span>
            <span v-else>Register</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { CalendarCheck } from 'lucide-vue-next';
import api from '../services/api';

const router = useRouter();
const loading = ref(false);
const error = ref('');

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'employee'
});

const handleRegister = async () => {
  loading.value = true;
  error.value = '';
  try {
    await api.post('/auth/signup', form);
    router.push('/login');
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
