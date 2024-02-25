import { defineStore } from 'pinia'

export const useBasicStore = defineStore('basic', {
  state: () => ({
    isLocked: true,
  }),
  actions: {
    setIsLocked(isLocked: boolean) {
      this.isLocked = isLocked
    },
  },
})
