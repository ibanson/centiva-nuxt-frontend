export function useApiFetch<T>(url: string, options: any = {}) {
  const config = useRuntimeConfig()

  return useFetch<T>(url, {
    baseURL: config.public.apiBase,
    ...options
  })
}
