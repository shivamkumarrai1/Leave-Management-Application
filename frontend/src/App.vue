<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar only visible for authenticated users -->
    <Sidebar v-if="isAuthenticated" />
    
    <main :class="['flex-1 transition-all duration-300', isAuthenticated ? 'p-8' : '']">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';

const route = useRoute();
const isAuthenticated = computed(() => {
  return !route.meta.public && !!localStorage.getItem('token');
});
</script>
