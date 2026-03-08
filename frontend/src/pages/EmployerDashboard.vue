<template>
  <div class="space-y-8">
    <div class="flex justify-between items-end">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Manage Leave Requests</h1>
        <p class="text-gray-500">Review and respond to employee leave applications.</p>
      </div>
      <div class="flex gap-4">
        <div class="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <p class="text-xs text-blue-600 font-semibold uppercase">Pending Requests</p>
          <p class="text-2xl font-bold text-blue-700">{{ pendingCount }}</p>
        </div>
      </div>
    </div>

    <!-- Requests Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-bold text-gray-800">All Applications</h2>
        <div class="flex gap-2">
          <button @click="filter = 'all'" :class="[filter === 'all' ? 'bg-gray-100' : '']" class="px-3 py-1 text-sm rounded-md hover:bg-gray-50">All</button>
          <button @click="filter = 'Pending'" :class="[filter === 'Pending' ? 'bg-yellow-50 text-yellow-700' : '']" class="px-3 py-1 text-sm rounded-md hover:bg-gray-50">Pending</button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Employee</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Leave Type</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Period</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="req in filteredRequests" :key="req.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs mr-3">
                    {{ req.userName ? req.userName.charAt(0) : 'U' }}
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">{{ req.userName || 'Unknown User' }}</div>
                    <div class="text-xs text-gray-500">{{ req.userEmail }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ req.type }}</td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-600">{{ formatDate(req.startDate) }} - {{ formatDate(req.endDate) }}</div>
                <div class="text-xs text-gray-400 italic mt-1">{{ req.reason || 'No reason' }}</div>
              </td>
              <td class="px-6 py-4">
                <StatusBadge :status="req.status" />
              </td>
              <td class="px-6 py-4">
                <div v-if="req.status === 'Pending'" class="flex space-x-2">
                  <button 
                    @click="updateStatus(req.id, 'Approved')"
                    class="p-1 px-3 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    @click="updateStatus(req.id, 'Rejected')"
                    class="p-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition-colors"
                  >
                    Reject
                  </button>
                </div>
                <div v-else class="text-xs text-gray-400">Processed</div>
              </td>
            </tr>
            <tr v-if="filteredRequests.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-gray-400">
                No leave requests found matching filters.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import StatusBadge from '../components/StatusBadge.vue';
import api from '../services/api';

const requests = ref([]);
const filter = ref('all');

const pendingCount = computed(() => {
  return requests.value.filter(r => r.status === 'Pending').length;
});

const filteredRequests = computed(() => {
  if (filter.value === 'all') return requests.value;
  return requests.value.filter(r => r.status === filter.value);
});

const fetchAllRequests = async () => {
  try {
    const response = await api.get('/leaves/all-requests');
    requests.value = response.data;
  } catch (err) {
    console.error('Failed to fetch requests', err);
  }
};

const updateStatus = async (id, status) => {
  try {
    await api.patch(`/leaves/${id}/status`, { status });
    const index = requests.value.findIndex(r => r.id === id);
    if (index !== -1) {
      requests.value[index].status = status;
    }
  } catch (err) {
    alert('Failed to update status');
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

onMounted(fetchAllRequests);
</script>
