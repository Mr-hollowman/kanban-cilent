import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBoards = createAsyncThunk("boards/getAllBoards", async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/boards/getBoards`,
        { withCredentials: true }
    )
    console.log(response, "boards response")
    return response.data
})

export const boardSlice = createSlice({
    name: "boards",
    initialState: {
        boards: [],
        isLoading: false,
        error: "",
        selectedBoard: ""
    },
    reducers: {
        changeBoard: (state, action) => {
            if (state.selectedBoard !== action.payload) {
                state.selectedBoard = action.payload
            }
        },
        clearBoards: (state) => {
            state.boards = [];
            state.isLoading = false;
            state.error = ""
            state.selectedBoard = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBoards.pending, (state, action) => {
            if (!state.isLoading) {
                state.isLoading = true;
                state.error = ""
                state.selectedBoard = ""
            }
        })
        builder.addCase(getBoards.fulfilled, (state, action) => {
            if (state.isLoading) {
                state.boards = action.payload
                state.isLoading = false
                state.error = ""
                state.selectedBoard = action.payload[0].title
            }
        })
        builder.addCase(getBoards.rejected, (state, action) => {
            if (state.isLoading) {
                state.isLoading = false
                state.selectedBoard = ""
                state.error = "Something went wrong, please try again later"
            }
        })
    },
})

export const { changeBoard, clearBoards } = boardSlice.actions;
export default boardSlice.reducer