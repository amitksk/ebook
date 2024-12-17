import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface TokenStore {
    accessToken: string;
    refreshToken: string;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
  }
  
  const useTokenStore = create<TokenStore>()(
    devtools(
      persist(
        (set) => ({
          accessToken: '',
          refreshToken: '',
          setTokens: (accessToken, refreshToken) => {
            console.log('Storing tokens:', accessToken, refreshToken); // Add log
            set({ accessToken, refreshToken });
          },
          clearTokens: () => set({ accessToken: '', refreshToken: '' }),
        }),
        { name: 'jwtTokens' } // LocalStorage key
      )
    )
  );
  
  export default useTokenStore;
  