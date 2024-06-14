import { create } from "zustand";

type AppState = {
  token: string | null;
};

type AppActions = {
  modifyUserToken: (token: string | null) => void;
};

export const useAppStore = create<AppState & AppActions>((set) => ({
  token: null,

  modifyUserToken: (token) => {
    console.log("TOKEN =>", token)

    set({ token })
  },
}));
