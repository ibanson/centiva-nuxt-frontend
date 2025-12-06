<script setup lang="ts">
import type { Team } from '@models/team'

const props = defineProps<{
  teams: Team[]
  title?: string
}>()

</script>

<template>

  <main class="max-w-4xl mx-auto p-6">
    <h1 v-if="title" class="text-3xl font-bold mb-6 text-center">{{ title }}</h1>

    <div v-if="teams.length === 0" class="text-center text-gray-500 py-10">
      Aucune équipe disponible pour le moment.
    </div>

    <ul class="space-y-3">
      <li
        v-for="team in teams"
        :key="team.id"
        class="border rounded-lg p-4 flex items-center justify-between"
      >
        <span class="font-medium">{{ team.name }}</span>

        <NuxtLink
          :to="`/teams/${team.id}`"
          class="btn btn-primary"
        >
          Voir →
        </NuxtLink>

      </li>
    </ul>

  </main>
</template>