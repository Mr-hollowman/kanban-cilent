import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../vars";

export const getUsers = createAsyncThunk("users/getUsers", async (email,password) => {
    const response = await axios({
        method:"POST",
        url:`${URL}/users/signin`,
        body:{email:email, password:password}
    })
    return response.data
})

export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: [],
        loading: false,
        error: "",
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getUsers.pending, (state,action)=>{
            if(!state.loading){
                state.loading = true;
            }
        })
        builder.addCase(getUsers.fulfilled, (state, action)=>{
            if(state.loading){
                state.data = action.payload
                state.loading = false
            }
        })
        builder.addCase(getUsers.rejected, (state, action)=>{
            if(state.loading){
                state.loading = false
                state.error = "Something went wrong, please try again later"
            }
        })
    },
})

export default userSlice.reducer