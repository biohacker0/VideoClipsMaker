import { createSlice } from '@reduxjs/toolkit'

export const clipSlice = createSlice({
  name: 'clips',
  initialState: {
    clips: [],
    currentClipId: 0,
  },
  reducers: {
    setInitialState: (state, action) => {
      state.clips = action.payload.clips
      state.currentClipId = action.payload.currentClipId
    },
    setCurrentClipId: (state, action) => {
      state.currentClipId = action.payload
      console.log(state.currentClipId)
    },
    addClip: (state, action) => {
      state.clips = [...state.clips, action.payload]
    },
    editClip: (state, action) => {
      state.clips = [
        ...state.clips.map((clip) =>
          clip.name === action.payload.name ? (clip = action.payload) : clip
        ),
      ]

      console.log(action.payload)
    },
    removeClip: (state, action) => {
      state.clips = state.clips.filter((clip) => clip.name !== action.payload)
    },
    addAnnotation: (state, action) => {
      state.clips[state.currentClipId].annotations.push(action.payload)
    },
    editAnnotation: (state, action) => {
      state.clips[state.currentClipId].annotations = state.clips[
        state.currentClipId
      ].annotations.map((annotation, index) => {
        if (index === action.payload.index) {
          annotation.startingTime = action.payload.value[0]
          annotation.endingTime = action.payload.value[1]
          annotation.config = action.payload.config
        }
        return annotation
      })
    },
    removeAnnotation: (state, action) => {
      const index = state.clips.findIndex(
        (clip) => clip.name === action.payload.currentClip
      )
      state.clips[index].annotations = state.clips[index].annotations.filter(
        (annotation) => annotation.name !== action.payload.annotationName
      )
    },
  },
})

export const {
  setInitialState,
  setCurrentClipId,
  addClip,
  removeClip,
  addAnnotation,
  editAnnotation,
  removeAnnotation,
  editClip,
} = clipSlice.actions

export default clipSlice.reducer
