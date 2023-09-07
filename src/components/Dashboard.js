import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import TodoContainer from './TodoContainer'
import BoardsList from './BoardsList'
import HideSideBarButton from './HideSideBarButton'

export default function Dashboard() {
  const navigate = useNavigate()
  const user = useSelector(state => state.user);
  const [hideSideBar, setHideSideBar] = useState(false)

  const handleHideSideBar = ()=>{
    setHideSideBar(!hideSideBar)
  }

  useEffect(() => {
    !user.user?._id && navigate("/login")
  }, [user])
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        {!hideSideBar && <BoardsList handleHideSideBar={handleHideSideBar} />}
        <TodoContainer />
        {hideSideBar && <HideSideBarButton handleHideSideBar={handleHideSideBar} />}
      </div>
    </div>
  )
}
