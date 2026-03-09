<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Employer Admin Panel</h1>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-4">Employee</th>
            <th class="p-4">Reason</th>
            <th class="p-4">Duration</th>
            <th class="p-4">Status</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leave in allLeaves" :key="leave._id" class="border-t">
            <td class="p-4">{{ leave.user?.name || 'Unknown' }}</td>
            <td class="p-4">{{ leave.reason }}</td>
            <td class="p-4">{{ leave.duration }} Days</td>
            <td class="p-4 capitalize">{{ leave.status }}</td>
            <td class="p-4 space-x-2">
              <button 
                v-if="leave.status === 'pending'"
                @click="updateStatus(leave._id, 'approved')" 
                class="bg-green-500 text-white px-3 py-1 rounded text-sm"
              >Approve</button>
              <button 
                v-if="leave.status === 'pending'"
                @click="updateStatus(leave._id, 'rejected')" 
                class="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >Reject</button>
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
const allLeaves = ref([]);

const fetchAllLeaves = async () => {
  try {
    const res = await api.get('/employer/all-leaves');
    allLeaves.value = res.data;
  } catch (err) { console.error(err); }
};

const updateStatus = async (id, status) => {
  try {
    await api.put(`/employer/update-status/${id}`, { status });
    fetchAllLeaves();
  } catch (err) { alert('Action failed'); }
};

const logout = () => {
  localStorage.clear();
  router.push('/login');
};

onMounted(fetchAllLeaves);
</script>