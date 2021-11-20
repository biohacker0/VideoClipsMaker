import { configureStore } from '@reduxjs/toolkit'
import videoReducer from './reducers/videoSlice'
import clipsReducer from './reducers/clipSlice'

export default configureStore({
  reducer: {
    video: videoReducer,
    clips: clipsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
