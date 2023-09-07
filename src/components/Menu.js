import React from 'react'
import { logout } from '../utils/reducers/userSlice'
import { useDispatch } from 'react-redux'

export default function Menu() {
    const dispatch = useDispatch()
  return (
    <div style={{position:"fixed", top: "10%", right:"3%",padding:"20px", width:"200px", background:"black"}}>
        <span onClick={()=>dispatch(logout())}>Logout</span>
    </div>
  )
}
