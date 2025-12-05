<script setup lang="ts">
import Snackbar from '~/components/Snackbar.vue';

</script>

<template>
  <div class="min-h-screen centiva-bg flex items-center justify-center px-4">
    <div class="w-full max-w-4xl py-10 bg-white">
      <Snackbar/>
      <slot></slot>
   </div>
  </div>
</template>