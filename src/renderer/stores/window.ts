import { defineStore } from 'pinia'

export const useWindowStore = defineStore({
    id: 'window',
    state: () => ({
        minimize: true,
        loading: true
    }),

    actions: {
        updatedMinimize() {
            this.$patch({ minimize: !this.minimize })
        },
        closeLoading() {
            this.$patch({ loading: false })
        }
    }
})
