import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBoards = createAsyncThunk("boards/getAllBoards", async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/boards/getBoards`)
    return response.data
})

export const boardSlice = createSlice({
    name: "boards",
    initialState: {
        boards: [],
        isLoading: false,
        error: "",
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getBoards.pending, (state, action) => {
            if (!state.isLoading) {
                state.isLoading = true;
                state.error = ""
            }
        })
        builder.addCase(getBoards.fulfilled, (state, action) => {
            if (state.isLoading) {
                state.boards = action.payload
                state.isLoading = false
                state.error = ""
            }
        })
        builder.addCase(getBoards.rejected, (state, action) => {
            if (state.isLoading) {
                state.isLoading = false
                state.error = "Something went wrong, please try again later"
            }
        })
    },
})

export const { } = boardSlice.actions;
export default boardSlice.reducer