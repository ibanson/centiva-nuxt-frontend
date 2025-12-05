// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'pathe'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api'
    }
  },
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  alias: {
    '@models': resolve(__dirname, 'app/models'),
    '@composables': resolve(__dirname, 'composables'),
    '@components': resolve(__dirname, 'app/components'),
  },
  css: [
    '~/assets/css/theme.css'
  ]
})
