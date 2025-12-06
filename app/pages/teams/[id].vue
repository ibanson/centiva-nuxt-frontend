<script setup lang="ts">
  import type { Team, TeamAPIResponse } from '@models/team'
  import { useSnackbar } from '@composables/useSnackbar'

  const snackbar = useSnackbar()

  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()

  const { data, pending, error } = await useFetch<TeamAPIResponse>(`/teams/${route.params.id}`, {
    baseURL: config.public.apiBase
  })

  const team: Team | null = data.value?.data ?? null
  const showAddForm= ref(false)

  const isDeleting = ref(false)
  const isAdding = ref(false)

  const newMember = reactive({
    name: "",
    email: ""
  })

  const handleDeleteTeam = async () => {
    if (!team) return

    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette équipe ? Cette action est définitive."
    )

    if (!confirmed) {
      return
    }

    isDeleting.value = true

    try {

      await $fetch(`/teams/${team.id}`, {
        baseURL: config.public.apiBase,
        method: 'DELETE'
      })

      snackbar.show('Équipe supprimée avec succès.', 'success')

      await router.push('/teams')
    } catch (err) {
      console.error(err)
      snackbar.show('La suppression de l\'équipe a échoué. Veuillez réessayer.', 'error')
    } finally {
      isDeleting.value = false
    }

  }

  function handleCancel() {
    showAddForm.value = false
    newMember.name = ""
    newMember.email = ""
  }

  async function handleSave() {

    if (!newMember.name || !newMember.email) return

    try {
      isAdding.value = true

      const response = await $fetch<TeamAPIResponse>(`/teams/${team?.id}/brokers`, {
        baseURL: config.public.apiBase,
        method: "POST",
        body: newMember
      })

      snackbar.show("Membre ajouté avec succès", "success")

      if (!team || !team?.brokers) {
        console.warn('Team non chargée, impossible de mettre à jour localement.')
      } else {
        team?.brokers?.push(response.data)
      }

      newMember.name = ""
      newMember.email = ""
      showAddForm.value = false

    } catch (err) {
      snackbar.show("Erreur lors de l'ajout du membre", "error")
    } finally {
      isAdding.value = false
    }
  }

</script>

<template>
  <main class="max-w-4xl mx-auto px-6 space-y-8">
    <div v-if="pending">
      Chargement de l'équipe...
    </div>

    <div v-else-if="error">
      Une erreur est survenue lors du chargement de cette équipe.
    </div>

    <div v-else-if="team">

      <!-- Header -->
      <header class="flex items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold mb-1">
            {{ team.name }}
          </h1>
          <p class="text-sm text-gray-500">
            Identifiant : {{ team.id }}
          </p>
        </div>

        <button
          type="button"
          class="btn btn-danger"
          :disabled="isDeleting"
          @click="handleDeleteTeam"
        >
          {{ isDeleting ? 'Suppression...' : 'Supprimer cette équipe' }}
        </button>
      </header>

      <!-- Broakers list -->
      <section class="mt-6">
        <h2 class="text-2xl font-semibold mb-3">Courtiers</h2>

        <div v-if="team?.brokers && team?.brokers?.length">
          <ul class="space-y-2">
            <li
              v-for="broker in team.brokers"
              :key="broker?.id"
              class="border rounded-md px-3 py-2 flex items-center justify-between"
            >
              <span>{{ broker?.name }} - <span class="text-slate-500">{{ broker?.email }}</span></span>
              <span class="text-xs text-gray-400">#{{ broker?.id }}</span>
            </li>
          </ul>
        </div>

        <p v-else class="text-sm text-gray-500">
          Aucun courtier dans cette équipe pour le moment.
        </p>

        <div class="mt-4">
          <div v-if="showAddForm" class="mt-4 w-full mx-auto bg-slate-100 p-4 rounded">
            <form @submit.prevent="handleSave" class="space-y-6">

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label class="block mb-2 font-medium text-[color:var(--centiva-text)]">
                    Nom du membre
                  </label>
                  <input
                    v-model="newMember.name"
                    type="text"
                    class="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--centiva-blue)]"
                    placeholder="Entrez le nom…"
                  />
                </div>

                <div>
                  <label class="block mb-2 font-medium text-[color:var(--centiva-text)]">
                    Email
                  </label>
                  <input
                    v-model="newMember.email"
                    type="email"
                    class="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--centiva-blue)]"
                    placeholder="email@example.com"
                  />
                </div>

              </div>


              <div class="flex justify-center gap-4 border-t pt-4">
                <button type="submit" @click="handleSave" :disabled="isAdding" class="btn btn-primary">
                  Sauvegarder
                </button>

                <button
                  @click="handleCancel"
                  class="btn btn-light"
                >
                  Annuler
                </button>
              </div>

            </form>
          </div>

          <div class="w-full">
            <button
              v-if="!showAddForm"
              @click="showAddForm = !showAddForm"
              class="btn btn-primary"
            >
              Ajouter un membre
            </button>
          </div>


        </div>
      </section>

      <!-- Add member in the team -->
      <section class="mt-8 border-t pt-6">
        <div class="flex justify-center">
          <NuxtLink
            to="/teams"
            class="btn btn-primary-outline inline-flex items-center mb-4"
          >
            ← Retour à la liste des équipes
          </NuxtLink>
        </div>
      </section>
    </div>

    <div v-else>
      <p>Équipe introuvable.</p>
    </div>
  </main>
</template>

