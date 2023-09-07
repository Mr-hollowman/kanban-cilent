import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import TodoContainer from './TodoContainer'
import BoardsList from './BoardsList'

export default function Dashboard() {
  const navigate = useNavigate()
  const user = useSelector(state => state.user);
  console.log(user, "user")

  useEffect(() => {
    !user.user?._id && navigate("/login")
  }, [user])
  return (
    <div>
      <NavBar />
      <div style={{display:"flex"}}>
      <BoardsList />
      <TodoContainer />
      </div>
    </div>
  )
}
