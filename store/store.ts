import createStore from 'zustand'
import createPasswordStrengthSlice, { PasswordStrengthSlice } from './passwordStrength.slice'

export type State = PasswordStrengthSlice

const useStore = createStore<State>((set) => ({
  ...createPasswordStrengthSlice(set),
}))

export default useStore
