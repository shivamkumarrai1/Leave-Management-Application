<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
    <div class="p-6 flex items-center space-x-3">
      <div class="bg-blue-600 p-2 rounded-lg">
        <CalendarCheck class="text-white w-6 h-6" />
      </div>
      <h1 class="text-xl font-bold text-gray-800">LeaveHub</h1>
    </div>

    <nav class="flex-1 px-4 space-y-1">
      <router-link 
        v-for="link in navigationLinks" 
        :key="link.name"
        :to="link.path"
        class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors"
        :class="[
          $route.path === link.path 
            ? 'bg-blue-50 text-blue-700' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        ]"
      >
        <component :is="link.icon" class="w-5 h-5 mr-3" />
        {{ link.name }}
      </router-link>
    </nav>

    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center p-3 mb-4">
        <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <User class="h-6 w-6 text-blue-600" />
        </div>
        <div class="ml-3">
          <p class="text-sm font-semibold text-gray-700">{{ userName }}</p>
          <p class="text-xs text-gray-500 capitalize">{{ userRole }}</p>
        </div>
      </div>
      <button 
        @click="handleLogout"
        class="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <LogOut class="w-5 h-5 mr-3" />
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  User, 
  LogOut, 
  History,
  ClipboardList
} from 'lucide-vue-next';

const router = useRouter();
const userRole = localStorage.getItem('userRole');
const userName = localStorage.getItem('userName') || 'User';

const navigationLinks = computed(() => {
  if (userRole === 'employer') {
    return [
      { name: 'Dashboard', path: '/employer', icon: LayoutDashboard },
      { name: 'Pending Approvals', path: '/employer', icon: ClipboardList },
    ];
  }
  return [
    { name: 'Request Leave', path: '/employee', icon: CalendarCheck },
    { name: 'My History', path: '/employee', icon: History },
  ];
});

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
};
</script>
