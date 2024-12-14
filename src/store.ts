import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface tokenStore {
  token: string;
  setToken: (data: string) => void;
}

const useTokenStore = create<tokenStore>()(
  devtools((set) => ({
    token: "",
    setToken: (data: string) => set(() => ({ token: data })),
  }))
);

export default useTokenStore;
