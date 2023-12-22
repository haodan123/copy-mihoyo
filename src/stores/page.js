import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
  const pageIndex = ref(0)
const homePage = ref('hero')
  return { pageIndex ,homePage}
})
