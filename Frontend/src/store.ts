import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface TokenStore {
    accessToken: string;
    refreshToken: string;
    //setTokens: (accessToken: string, refreshToken: string) => void;
    setTokens: (accessToken: string, refreshToken: string, callback?: () => void) => void;
    clearTokens: () => void;
  }
  
  const useTokenStore = create<TokenStore>()(
    devtools(
      persist(
        (set) => ({
          accessToken: '',
          refreshToken: '',
          setTokens: (accessToken, refreshToken, callback) => {
            console.log('Storing tokens:', accessToken, refreshToken); // Debug log
            set({ accessToken, refreshToken });
            if (callback) callback(); // Optional callback after state update
          },
          clearTokens: () => set({ accessToken: '', refreshToken: '' }),
        }),
        { name: 'jwtTokens' }
      )
    )
  );
  
  
  export default useTokenStore;
  

  // const useTokenStore = create<TokenStore>()(
  //   devtools(
  //     persist(
  //       (set) => ({
  //         accessToken: '',
  //         refreshToken: '',
  //         setTokens: (accessToken, refreshToken) => {
  //           //console.log('Storing tokens:', accessToken, refreshToken);
  //           set({ accessToken, refreshToken });
  //         },
  //         clearTokens: () => set({ accessToken: '', refreshToken: '' }),
  //       }),
  //       { name: 'jwtTokens' } // LocalStorage key
  //     )
  //   )
  // );
  
  // export default useTokenStore;
  
