import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Session } from 'next-auth';

type UserState = {
  user: Session['user'] | null;
  setUser: (user: Session['user'] | null) => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      {
        name: 'user-storage', // name of the item in the storage (must be unique)
      }
    )
  )
);
