import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    open: false,
    severity: "success",
    message: "",
  },
  reducers: {
    triggerToast: (state, action) => {
      // state = {
      state.open = action.payload.open;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      // }
    },
    handleCloseToast: (state, action) => {
      state.open = false;
      state.severity = "success";
      state.message = "";
    },
  },
});

export const { triggerToast, handleCloseToast } = toastSlice.actions;
export default toastSlice.reducer;
