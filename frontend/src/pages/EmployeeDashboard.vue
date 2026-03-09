<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Welcome, {{ userName }}</h1>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded text-sm">Logout</button>
    </div>

    <!-- Apply Leave Form -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">Apply for Leave</h2>
      <form @submit.prevent="submitLeave" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium">Reason</label>
          <input v-model="leaveForm.reason" type="text" required class="w-full p-2 border rounded" placeholder="Doctor appointment">
        </div>
        <div>
          <label class="block text-sm font-medium">Duration (Days)</label>
          <input v-model="leaveForm.duration" type="number" required min="1" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit Application</button>
      </form>
    </div>

    <!-- Leave History -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">My Leave History</h2>
      <table class="w-full text-left">
        <thead>
          <tr class="border-b">
            <th class="py-2">Reason</th>
            <th class="py-2">Duration</th>
            <th class="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leave in leaves" :key="leave._id" class="border-b">
            <td class="py-2">{{ leave.reason }}</td>
            <td class="py-2">{{ leave.duration }} days</td>
            <td class="py-2">
              <span :class="getStatusClass(leave.status)">{{ leave.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const userName = localStorage.getItem('userName');
const leaves = ref([]);
const leaveForm = ref({ reason: '', duration: 1 });

const fetchLeaves = async () => {
  try {
    const res = await api.get('/employee/my-leaves');
    leaves.value = res.data;
  } catch (err) { console.error(err); }
};

const submitLeave = async () => {
  try {
    await api.post('/employee/apply-leave', leaveForm.value);
    alert('Leave applied successfully!');
    leaveForm.value = { reason: '', duration: 1 };
    fetchLeaves();
  } catch (err) { alert('Error applying leave'); }
};

const logout = () => {
  localStorage.clear();
  router.push('/login');
};

const getStatusClass = (status) => {
  if (status === 'approved') return 'text-green-600 font-bold';
  if (status === 'rejected') return 'text-red-600 font-bold';
  return 'text-yellow-600 font-bold font-italic';
};

onMounted(fetchLeaves);
</script>
