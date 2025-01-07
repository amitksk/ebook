import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface TokenStore {
    accessToken: string;
    setTokens: (accessToken: string, callback?: () => void) => void;
    clearTokens: () => void;
}

const useTokenStore = create<TokenStore>()(
    devtools(
      persist(
        (set) => ({
          accessToken: '',
          setTokens: (accessToken, callback) => {
            console.log('Storing tokens:', accessToken);
            set({ accessToken });
            if (callback) callback();
          },
          clearTokens: () => set({ accessToken: '' }),
        }),
        { name: 'accessToken' }
      )
    )
);

export default useTokenStore;