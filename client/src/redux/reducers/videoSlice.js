import { createSlice } from '@reduxjs/toolkit'

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    metadata: {
      videoHeight: null,
      videoWidth: null,
      duration: null,
      currentTimeStamp: 0,
    },
  },
  reducers: {
    setMetadata: (state, action) => {
      state.metadata = { ...action.payload }
    },
    setCurrent: (state, action) => {
      state.currentTimeStamp = action.payload
      // console.log("🚀 ~ file: videoSlice.js ~ line 19 ~ state.current", state.currentTimeStamp)
    },
  },
})

export const { setMetadata, setCurrent } = videoSlice.actions
export default videoSlice.reducer
