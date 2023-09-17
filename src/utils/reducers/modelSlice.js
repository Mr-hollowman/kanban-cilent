import { createSlice } from "@reduxjs/toolkit";


export const modelSlice = createSlice({
    name: 'model',
    initialState: {
        open: false,
        title: "",
        isBoards: undefined
    },
    reducers: {
        triggerModel: (state, action) => {
            state.open = true
            state.title = action.payload.title
            state.isBoards = action.payload.isBoards
        },
        closeModel: (state, action) => {
            state.open = false
            state.title = ""
            state.isBoards = undefined
        }
    }
})

export const { triggerModel, closeModel } = modelSlice.actions;
export default modelSlice.reducer;