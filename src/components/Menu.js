import React from 'react'
import { logout } from '../utils/reducers/userSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

export default function Menu() {
    const dispatch = useDispatch()
    const handleLogout = ()=>{
      axios.post(process.env.REACT_APP_LOGOUT_URL,{},{withCredentials:true})
      dispatch(logout())
    }
  return (
    <div style={{position:"fixed", top: "10%", right:"3%",padding:"20px", width:"200px", background:"black"}}>
        <span onClick={handleLogout}>Logout</span>
    </div>
  )
}
