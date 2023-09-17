import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getUsers } from '../utils/reducers/userSlice'

export default function TodoContainer({handleRequest}) {
  const dispatch = useDispatch()
    const theme = useTheme()
    const getfn = async ()=>{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/boards/getBoards`,{
          withCredentials: true,
        })
        console.log(res.data,"res");
    }
    const handleLogin = async()=>{
      dispatch(getUsers({"email":"nothing@gmail.com","password":"nothing", "isSignup":false})).then(res=>{
        // const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/signin`,{email:"nothing@gmail.com", password:"nothing"})
        console.log(res,"res")
      })
    }
  return (
    <Box sx={{width:'100%', height:"100vh", background:theme.palette.contentBackground}}>
        nothin
        <button onClick={()=>getfn()}>get board me</button>
        <button onClick={()=>handleLogin()}>Login me</button>
    </Box>
  )
}
