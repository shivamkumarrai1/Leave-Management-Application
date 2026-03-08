<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Apply for Leave</h1>
        <p class="text-gray-500">Fill out the form below to submit a new leave request.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Leave Form -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form @submit.prevent="submitRequest" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 shadow-none mb-1">Leave Type</label>
              <select v-model="form.type" class="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none">
                <option value="Sick Leave">Sick Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Maternity/Paternity">Maternity/Paternity</option>
              </select>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input v-model="form.startDate" type="date" required class="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input v-model="form.endDate" type="date" required class="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
              <textarea v-model="form.reason" rows="3" class="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none" placeholder="Explain your request..."></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="submitting"
              class="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ submitting ? 'Submitting...' : 'Submit Request' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Requests History -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-800">My Leave History</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Leave Type</th>
                  <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</th>
                  <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="req in requests" :key="req.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ req.type }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-600">{{ formatDate(req.startDate) }} - {{ formatDate(req.endDate) }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <StatusBadge :status="req.status" />
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {{ req.reason || 'No reason provided' }}
                  </td>
                </tr>
                <tr v-if="requests.length === 0">
                  <td colspan="4" class="px-6 py-12 text-center text-gray-400">
                    No leave requests found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import StatusBadge from '../components/StatusBadge.vue';
import api from '../services/api';

const loading = ref(true);
const submitting = ref(false);
const requests = ref([]);

const form = reactive({
  type: 'Sick Leave',
  startDate: '',
  endDate: '',
  reason: ''
});

const fetchHistory = async () => {
  try {
    const response = await api.get('/leaves/my-requests');
    requests.value = response.data;
  } catch (err) {
    console.error('Failed to fetch history', err);
  } finally {
    loading.value = false;
  }
};

const submitRequest = async () => {
  submitting.value = true;
  try {
    const response = await api.post('/leaves/request', form);
    requests.value.unshift(response.data);
    // Reset form
    form.startDate = '';
    form.endDate = '';
    form.reason = '';
    alert('Leave request submitted successfully!');
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to submit request');
  } finally {
    submitting.value = false;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

onMounted(fetchHistory);
</script>
