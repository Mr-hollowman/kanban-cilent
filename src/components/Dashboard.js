import React, { useEffect } from 'react'
import { logout } from '../utils/reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

export default function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user);
  console.log(user,"user")

  useEffect(() => {
    !user.user?._id && navigate("/login")
  }, [dispatch, user, logout])
  return (
    <div>
      <NavBar />
    </div>
  )
}
