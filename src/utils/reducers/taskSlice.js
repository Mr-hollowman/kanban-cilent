import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (selectedBoardId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/boards/getTasks?boardId=${selectedBoardId}`,
      { withCredentials: true }
    );
    return { tasks: response.data, status: response.status };
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isLoading: false,
    error: "",
    status: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state, action) => {
      if (!state.isLoading) {
        state.isLoading = true;
        state.error = "";
        state.selectedBoard = "";
      }
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      if (state.isLoading) {
        state.tasks = action.payload.tasks;
        state.isLoading = false;
        state.error = "";
        state.status = action.payload.status;
      }
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      if (state.isLoading) {
        state.isLoading = false;
        state.selectedBoard = "";
        state.error = "Something went wrong, please try again later";
      }
    });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
