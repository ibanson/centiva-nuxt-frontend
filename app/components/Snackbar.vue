<script setup lang="ts">
import { useSnackbar } from '@composables/useSnackbar';

const { message, type, visible } = useSnackbar();
</script>

<template>
  <transition name="fade">
  <div
    v-if="visible"
    :class="[
      'fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-md shadow-lg text-white font-medium',
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    ]"
  >
    {{ message }}
  </div>
</transition>
</template>