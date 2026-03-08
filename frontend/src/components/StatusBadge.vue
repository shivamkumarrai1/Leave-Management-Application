<template>
  <span :class="['px-2.5 py-0.5 rounded-full text-xs font-medium', config.styles]">
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true
  }
});

const config = computed(() => {
  switch (props.status.toLowerCase()) {
    case 'approved':
      return { styles: 'bg-green-100 text-green-800 border border-green-200' };
    case 'rejected':
      return { styles: 'bg-red-100 text-red-800 border border-red-200' };
    case 'pending':
    default:
      return { styles: 'bg-yellow-100 text-yellow-800 border border-yellow-200' };
  }
});
</script>
