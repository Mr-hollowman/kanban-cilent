import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import TodoContainer from './TodoContainer'
import BoardsList from './BoardsList'
import HideSideBarButton from './HideSideBarButton'
import Menu from './Menu'
import { getBoards } from '../utils/reducers/boardSlice'

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user);
  const [hideSideBar, setHideSideBar] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleHideSideBar = () => {
    setHideSideBar(!hideSideBar)
  }
  const handleRequest = ()=>{
    dispatch(getBoards())
  }

  useEffect(() => {
    !user.user?._id && navigate("/login")
  }, [user])
  return (
    <div onClick={() => isMenuOpen ? setIsMenuOpen(false) : null}>
      <NavBar setIsMenuOpen={setIsMenuOpen} />
      <div style={{ display: "flex" }}>
        {!hideSideBar && <BoardsList handleHideSideBar={handleHideSideBar} />}
        <TodoContainer handleRequest={handleRequest} />
        {hideSideBar && <HideSideBarButton handleHideSideBar={handleHideSideBar} />}
        {isMenuOpen && <Menu />}
      </div>
    </div>
  )
}
