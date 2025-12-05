import { ref } from 'vue'

const message = ref<string | null>(null)
const type = ref<'success' | 'error' | null>(null)
const visible = ref(false)

export function useSnackbar() {
  function show(msg: string, t: 'success' | 'error' = 'success') {
    message.value = msg
    type.value = t
    visible.value = true

    setTimeout(() => {
      visible.value = false
    }, 3000)
  }

  return {
    message,
    type,
    visible,
    show
  }
}