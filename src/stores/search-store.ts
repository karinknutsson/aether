import { defineStore, acceptHMRUpdate } from "pinia";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({}),
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot));
}
