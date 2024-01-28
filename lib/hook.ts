import type { AppDispatch, AppStore, RootState } from './store'
import { useDispatch, useSelector, useStore } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useAppSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore