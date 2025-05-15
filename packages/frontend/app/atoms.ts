import { atom, createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const darkModeAtom = atomWithStorage<'light' | 'dark' | 'system'>('epo.darkMode', 'system')
