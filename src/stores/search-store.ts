import { defineStore, acceptHMRUpdate } from "pinia";

const MAPBOX_SEARCHBOX_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    suggestions: [] as any[],
    loading: false,
    error: null as string | null,
  }),
  getters: {},
  actions: {
    async fetchSuggestions(query: string) {
      if (!query) {
        this.suggestions = [];
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const token = process.env.MAPBOX_API_KEY;
        if (!token) return;

        const sessionToken = Math.random().toString(36).substring(2);

        const params = new URLSearchParams({
          q: query,
          access_token: token,
          language: "en",
          limit: "5",
          session_token: sessionToken,
        });

        const res = await fetch(`${MAPBOX_SEARCHBOX_URL}?${params.toString()}`);
        const data = await res.json();

        if (res.ok) {
          this.suggestions = data.suggestions;
        } else {
          this.error = data.message || "Failed to fetch suggestions";
          this.suggestions = [];
        }
      } catch (err: any) {
        this.error = err?.message || "Search failed";
        this.suggestions = [];
      } finally {
        this.loading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot));
}
