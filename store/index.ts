import create from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedProfile } from '../types'

type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  editedProfile: EditedProfile
  updateEditedProfile: (payload: EditedProfile) => void
  resetEditedProfile: () => void
}
const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  editedProfile: { username: '', avatar_url: '', favorites: '' },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        avatar_url: payload.avatar_url,
        favorites: payload.favorites,
      },
    }),
  resetEditedProfile: () =>
    set({
      editedProfile: {
        username: '',
        avatar_url: '',
        favorites: '',
      },
    }),
}))
export default useStore
