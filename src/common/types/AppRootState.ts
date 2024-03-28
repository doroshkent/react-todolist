import { store } from 'app'

export type AppRootState = ReturnType<typeof store.getState>
