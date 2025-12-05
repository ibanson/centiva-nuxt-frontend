<script setup lang="ts">
  import { computed } from 'vue'
  import TeamsList from '@components/TeamList.vue'
  import type { TeamsAPIResponse, Team } from '@models/team'

  const config = useRuntimeConfig()

  const { data, pending, error } = await useFetch<TeamsAPIResponse>('/teams', {
    baseURL: config.public.apiBase
  })

  const teams = computed<Team[]>(() => data.value?.data ?? [])

</script>

<template>

  <main class="max-w-4xl mx-auto p-6">
     <div v-if="pending">Chargement des équipes...</div>
    <div v-else-if="error">Une erreur est survenue.</div>
    <TeamsList v-else :teams="teams" title="Liste des équipes depuis /teams" />
  </main>
</template>