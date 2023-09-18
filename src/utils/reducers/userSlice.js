import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("users/getUsers", async (cred) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/${
      cred.isSignUp ? "signup" : "signin"
    }`,
    { email: cred.email, password: cred.password, name: cred.name },
    { withCredentials: true }
  );
  return { ...response.data, status: response.status };
});

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: [],
    isLoading: false,
    error: "",
  },
  reducers: {
    logout: (state) => {
      state.user = [];
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      if (!state.isLoading) {
        state.isLoading = true;
        state.error = "";
      }
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (state.isLoading) {
        state.user = action.payload;
        state.isLoading = false;
        state.error = "";
      }
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      if (state.isLoading) {
        state.isLoading = false;
        state.error = "Something went wrong, please try again later";
      }
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
