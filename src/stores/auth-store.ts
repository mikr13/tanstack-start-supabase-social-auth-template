import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  selectedProvider: "google" | "github" | "linkedin_oidc" | null;
  cachedUser: User | null;

  setSelectedProvider: (
    provider: "google" | "github" | "linkedin_oidc" | null,
  ) => void;
  setCachedUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      selectedProvider: null,
      cachedUser: null,

      setSelectedProvider: (provider) => set({ selectedProvider: provider }),
      setCachedUser: (user) => set({ cachedUser: user }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        cachedUser: state.cachedUser,
      }),
    },
  ),
);
